import { Country, CountryProviders, RawOffers } from "@/globals/types"
import CountryWatchProviders from "@/sections/details/watch/country"
import { createApiRequest } from "@/utils/tmdb/tmdb-api"

const TitleOffers = async ({ id, type }: { id: number; type: string }) => {
	const countries: Array<Country> | undefined = await createApiRequest(
		"/configuration/countries"
	)
	countries?.sort((a, b) => a.english_name.localeCompare(b.english_name))

	const rawData: RawOffers | undefined = await createApiRequest(
		`/${type}/${id}/watch/providers`
	)
	console.log("rawData:", rawData)

	const titleProviders =
		rawData &&
		Object.entries(rawData.results).reduce(
			(acc, [key, value]: [string, any]) => {
				const { link, ...newValue } = value
				acc[key] = newValue
				return acc
			},
			{} as Record<string, CountryProviders>
		)
	console.log("titleProviders:", titleProviders)

	return (
		<div className="mt-20">
			{countries &&
				countries.map((country: any) => {
					if (titleProviders && titleProviders[country.iso_3166_1]) {
						return (
							<CountryWatchProviders
								countryName={country.english_name}
								key={country.iso_3166_1}
								providersForCountry={
									titleProviders[country.iso_3166_1]
								}
							/>
						)
					}
					return null
				})}
		</div>
	)
}

export default TitleOffers
