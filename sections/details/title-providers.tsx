import {
	Country,
	RawOffers,
	CountryProviders,
	SeasonWatchProviders,
	TVShowDetails,
	WatchProvider // Added import
} from "@/globals/types"
import CountryWatchProviders from "@/sections/details/watch/country"
import { createApiRequest } from "@/utils/tmdb/tmdb-api"

const getAllSeasonsAvailability = async (seriesId: number) => {
	// 1. Get the show details to see which seasons exist
	const show = await createApiRequest<TVShowDetails>(`/tv/${seriesId}`)

	if (!show || !show.seasons) return null

	// 2. Map seasons to an array of provider requests
	const providerRequests = show.seasons.map(season =>
		createApiRequest<SeasonWatchProviders>(
			`/tv/${seriesId}/season/${season.season_number}/watch/providers`
		)
	)

	// 3. Fire all requests concurrently
	const allProviders = await Promise.all(providerRequests)

	// 4. Pair the season info with its provider data
	return show.seasons.map((season, index) => ({
		season_name: season.name,
		season_number: season.season_number,
		availability: allProviders[index]?.results || {}
	}))
}

export default async ({ id, type }: { id: number; type: string }) => {
	// Fetch countries
	const countries = await createApiRequest<Array<Country>>(
		"/configuration/countries"
	)

	if (!countries || countries.length === 0) {
		return <div>No country data available.</div>
	}

	// Sort countries alphabetically
	countries.sort((a, b) => a.english_name.localeCompare(b.english_name))

	// Fetch watch providers for the title
	const rawData = await createApiRequest<RawOffers>(
		`/${type}/${id}/watch/providers`
	)
	if (!rawData || !rawData.results)
		return <div>No watch provider data available for this title.</div>

	// Transform TMDB results to a safe object without the "link" field
	const titleProviders: Record<string, CountryProviders> = Object.entries(
		rawData.results
	).reduce(
		(acc, [countryCode, value]) => {
			if (!value) return acc
			const { link, ...rest } = value
			acc[countryCode] = rest as unknown as CountryProviders
			return acc
		},
		{} as Record<string, CountryProviders>
	)

	const seasons = await getAllSeasonsAvailability(id)

	return (
		<div className="mt-20">
			{countries.map(country => {
				const providersForCountry = titleProviders[country.iso_3166_1]
				if (!providersForCountry) return null

				// Defining the explicit local layout coming out of the maps
				type LocalSeasonData = {
					season_name: string
					season_number: number
					providers: Record<string, WatchProvider[]>
				}

				// Updated type declaration here to match the nested object layout
				const seasonsForCountry: LocalSeasonData[] = (seasons || [])
					.map(season => {
						const countryProviders =
							season.availability[country.iso_3166_1]
						if (!countryProviders) return null

						const { link, ...providersOnly } = countryProviders
						return {
							season_name: season.season_name,
							season_number: season.season_number,
							providers: providersOnly as Record<
								string,
								WatchProvider[]
							>
						}
					})
					// Cleaner type guard verification
					.filter((s): s is LocalSeasonData => s !== null)

				return (
					<CountryWatchProviders
						key={country.iso_3166_1}
						countryName={country.english_name}
						providersForCountry={providersForCountry}
						seasonsProviders={seasonsForCountry}
					/>
				)
			})}
		</div>
	)
}
