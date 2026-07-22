import {
	Country,
	RawOffers,
	CountryProviders,
	SeasonProvidersByType,
	SeasonWatchProviders,
	TVShowDetails
} from "@/globals/types"
import CountryWatchProviders from "@/sections/details/watch/country"
import CountryAvailability from "@/sections/details/watch/country-availability"
import { baseURLImage, createApiRequest } from "@/utils/tmdb/tmdb-api"
import Image from "next/image"

const getAllSeasonsAvailability = async (seriesId: number) => {
	// 1. Get the show details to see which seasons exist
	const show = await createApiRequest<TVShowDetails>(`/tv/${seriesId}`)

	if (!show || !show.seasons) return null

	const regularSeasons = show.seasons.filter(
		season => season.season_number > 0
	)

	// 2. Map seasons to an array of provider requests
	const providerRequests = regularSeasons.map(season =>
		createApiRequest<SeasonWatchProviders>(
			`/tv/${seriesId}/season/${season.season_number}/watch/providers`
		)
	)

	// 3. Fire all requests concurrently
	const allProviders = await Promise.all(providerRequests)

	// 4. Pair the season info with its provider data
	return regularSeasons.map((season, index) => ({
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

const FEATURED_PROVIDERS = [
	{
		label: "Netflix",
		matches: ["netflix"],
		matchMode: "includes"
	},
	{
		label: "HBO Max",
		matches: ["hbo max", "max"],
		matchMode: "exact"
	},
	{
		label: "Disney+",
		matches: ["disney plus"],
		matchMode: "exact"
	}
] as const

const getFeaturedProviders = (
	providers: CountryProviders,
	matches: readonly string[],
	matchMode: "exact" | "includes"
) =>
	Object.values(providers)
		.flat()
		.filter(provider => {
			const name = provider.provider_name.toLowerCase().trim()

			return matches.some(match =>
				matchMode === "exact" ? name === match : name.includes(match)
			)
		})

const getFeaturedSeasonNumbers = (
	countryCode: string,
	providersForCountry: CountryProviders,
	seasons: Awaited<ReturnType<typeof getAllSeasonsAvailability>>,
	matches: readonly string[],
	matchMode: "exact" | "includes"
) => {
	if (!seasons) return []

	const seasonsWithCountryData = seasons.filter(
		season => season.availability[countryCode]
	)

	if (seasonsWithCountryData.length === 0) {
		return getFeaturedProviders(providersForCountry, matches, matchMode).length >
			0
			? seasons.map(season => season.season_number)
			: []
	}

	return seasonsWithCountryData.flatMap(season => {
		const providers = getProvidersOnly(season.availability[countryCode])

		return getFeaturedProviders(providers, matches, matchMode).length > 0
			? [season.season_number]
			: []
	})
}

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
	const featuredSections = FEATURED_PROVIDERS.map(featuredProvider => {
		const logoPath = Object.values(titleProviders)
			.flatMap(providers =>
				getFeaturedProviders(
					providers,
					featuredProvider.matches,
					featuredProvider.matchMode
				)
			)
			.find(provider => provider.logo_path)?.logo_path
		const providerCountries = countries
			.map(country => {
				const providersForCountry = titleProviders[country.iso_3166_1]
				if (!providersForCountry) return null

				const hasProvider =
					getFeaturedProviders(
						providersForCountry,
						featuredProvider.matches,
						featuredProvider.matchMode
					).length > 0
				const availableSeasons = getFeaturedSeasonNumbers(
					country.iso_3166_1,
					providersForCountry,
					seasons,
					featuredProvider.matches,
					featuredProvider.matchMode
				)

				if (!hasProvider && availableSeasons.length === 0) return null

				return {
					countryCode: country.iso_3166_1,
					countryName: country.english_name,
					availableSeasons
				}
			})
			.filter(
				(country): country is NonNullable<typeof country> => country !== null
			)

		return {
			...featuredProvider,
			logoPath,
			countries: providerCountries
		}
	})

	return (
		<div className="mt-20">
			{featuredSections.map(section => {
				if (section.countries.length === 0) return null

				return (
					<div
						key={section.label}
						className="relative mb-8 rounded-xl bg-white/15 p-12 pb-4"
					>
						<div>
							<h2 className="mb-2 flex items-center gap-3 text-3xl">
								{section.logoPath && (
									<Image
										src={baseURLImage + section.logoPath}
										width={42}
										height={42}
										alt=""
										className="rounded-lg shadow-md"
										style={{
											width: "42px",
											height: "42px"
										}}
									/>
								)}
								<span>{section.label}</span>
							</h2>

							<article className="mb-6">
								<h3 className="mt-4 mb-2 text-xl font-semibold capitalize opacity-80">
									Countries
								</h3>

								<div className="flex flex-wrap gap-4">
									{section.countries.map(country => (
										<CountryAvailability
											key={country.countryCode}
											countryCode={country.countryCode}
											countryName={country.countryName}
											availableSeasons={country.availableSeasons}
										/>
									))}
								</div>
							</article>
						</div>
					</div>
				)
			})}

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

				const hasExplicitSeasonProviders = seasonsForCountry.length > 0
				const fallbackSeasonsForCountry: SeasonProvidersByType[] =
					!hasExplicitSeasonProviders && seasons
						? seasons.map(season => ({
								season_name: season.season_name,
								season_number: season.season_number,
								providers: providersForCountry
							}))
						: []

				return (
					<CountryWatchProviders
						key={country.iso_3166_1}
						countryName={country.english_name}
						providersForCountry={providersForCountry}
						seasonsProviders={
							hasExplicitSeasonProviders
								? seasonsForCountry
								: fallbackSeasonsForCountry
						}
					/>
				)
			})}
		</div>
	)
}
