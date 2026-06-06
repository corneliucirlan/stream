import {
	Country,
	RawOffers,
	CountryProviders,
	SeasonProvidersByType,
	SeasonWatchProviders,
	TVShowDetails
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

const getProvidersOnly = (
	availability: RawOffers["results"][string]
): CountryProviders =>
	Object.entries(availability).reduce<CountryProviders>(
		(acc, [providerType, providers]) => {
			if (Array.isArray(providers)) acc[providerType] = providers
			return acc
		},
		{}
	)

export default async function TitleProviders({
	id,
	type
}: {
	id: number
	type: string
}) {
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
			acc[countryCode] = getProvidersOnly(value)
			return acc
		},
		{} as Record<string, CountryProviders>
	)

	const seasons = type === "tv" ? await getAllSeasonsAvailability(id) : null

	return (
		<div className="mt-20">
			{countries.map(country => {
				const providersForCountry = titleProviders[country.iso_3166_1]
				if (!providersForCountry) return null

				const seasonsForCountry: SeasonProvidersByType[] = (seasons || [])
					.map(season => {
						const countryProviders =
							season.availability[country.iso_3166_1]
						if (!countryProviders) return null

						return {
							season_name: season.season_name,
							season_number: season.season_number,
							providers: getProvidersOnly(countryProviders)
						}
					})
					.filter((s): s is SeasonProvidersByType => s !== null)

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
