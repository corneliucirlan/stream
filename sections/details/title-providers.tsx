import { Country, CountryProviders, RawOffers } from "@/globals/types"
import CountryWatchProviders from "@/sections/details/watch/country"
import { createApiRequest } from "@/utils/tmdb/tmdb-api"

const TitleOffers = async ({ id, type }: { id: number; type: string }) => {
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
			acc[countryCode] = rest
			return acc
		},
		{} as Record<string, CountryProviders>
	)

	return (
		<div className="mt-20">
			{countries.map(country => {
				const providersForCountry = titleProviders[country.iso_3166_1]

				if (!providersForCountry) return null

				return (
					<CountryWatchProviders
						key={country.iso_3166_1}
						countryName={country.english_name}
						providersForCountry={providersForCountry}
					/>
				)
			})}
		</div>
	)
}

export default TitleOffers
