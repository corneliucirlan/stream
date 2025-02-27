import { Country, CountryProviders, RawOffers } from "@/globals/types"
import CountryWatchProviders from "@/sections/details/watch/country"
import { createApiRequest } from "@/utils/tmdb/tmdb-api"

export default async ({ id, type }: { id: number; type: string }) => {
	const countries: Array<Country> | undefined = await createApiRequest(
		"/configuration/countries"
	)

	const rawData: RawOffers | undefined = await createApiRequest(
		`/${type}/${id}/watch/providers`
	)

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
