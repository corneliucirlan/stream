import {
	CountryProviders,
	SeasonAvailability,
	WatchProvider
} from "@/globals/types"
import CategoryProvidersComponent from "@/sections/details/watch/category"

export default ({
	countryName,
	providersForCountry,
	seasonsProviders
}: {
	countryName: string
	providersForCountry: CountryProviders
	// 1. Update this to match the actual object shape coming from the parent component
	seasonsProviders: Array<{
		season_name: string
		season_number: number
		providers: Record<string, WatchProvider[]>
	}>
}) => {
	return (
		<div className="relative mb-8 rounded-xl bg-white/15 p-12 pb-4">
			<div>
				<h2 className="mb-2 text-3xl">{countryName}</h2>

				{(Object.keys(providersForCountry) as string[]).map(type => {
					const categoryProviders = providersForCountry[type]
					if (!categoryProviders || categoryProviders.length === 0)
						return null

					// 2. Filter and isolate down to standard SeasonAvailability[] arrays for the child
					const seasonsForThisType: SeasonAvailability[] =
						seasonsProviders
							.filter(
								season =>
									season.providers &&
									season.providers[type] &&
									season.providers[type].length > 0
							)
							.map(season => ({
								season_name: season.season_name,
								season_number: season.season_number,
								providers: season.providers[type] // Perfect, safe array lookup!
							}))

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
