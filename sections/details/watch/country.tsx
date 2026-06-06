import {
	AvailabilityType,
	CountryProviders,
	SeasonAvailability,
	SeasonProvidersByType
} from "@/globals/types"
import CategoryProvidersComponent from "@/sections/details/watch/category"

type CountryWatchProvidersProps = {
	countryName: string
	providersForCountry: CountryProviders
	seasonsProviders: SeasonProvidersByType[]
}

const PROVIDER_TYPE_ORDER: AvailabilityType[] = [
	"flatrate",
	"free",
	"ads",
	"rent",
	"buy"
]

const getProviderTypes = (providers: CountryProviders) => {
	const availableTypes = Object.keys(providers).filter(
		type => providers[type]?.length > 0
	)

	return [
		...PROVIDER_TYPE_ORDER.filter(type => availableTypes.includes(type)),
		...availableTypes.filter(
			type => !PROVIDER_TYPE_ORDER.includes(type as AvailabilityType)
		)
	]
}

const getSeasonsForProviderType = (
	seasonsProviders: SeasonProvidersByType[],
	type: string
): SeasonAvailability[] =>
	seasonsProviders.flatMap(season => {
		const providers = season.providers[type]

		if (!providers?.length) return []

		return [
			{
				season_name: season.season_name,
				season_number: season.season_number,
				providers
			}
		]
	})

export default function CountryWatchProviders({
	countryName,
	providersForCountry,
	seasonsProviders
}: CountryWatchProvidersProps) {
	const providerTypes = getProviderTypes(providersForCountry)

	if (providerTypes.length === 0) return null

	return (
		<div className="relative mb-8 rounded-xl bg-white/15 p-12 pb-4">
			<div>
				<h2 className="mb-2 text-3xl">{countryName}</h2>

				{providerTypes.map(type => {
					const categoryProviders = providersForCountry[type]
					const seasonsForThisType = getSeasonsForProviderType(
						seasonsProviders,
						type
					)

					return (
						<CategoryProvidersComponent
							key={type}
							type={type}
							category={categoryProviders}
							seasons={seasonsForThisType}
						/>
					)
				})}
			</div>
		</div>
	)
}
