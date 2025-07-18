import { CountryProviders } from "@/globals/types"

import CategoryProvidersComponent from "@/sections/details/watch/category"

const CountryWatchProviders = ({
	countryName,
	providersForCountry
}: {
	countryName: string
	providersForCountry: CountryProviders
}) => (
	<div className="relative mb-8 rounded-xl bg-white/15 p-12 pb-4">
		<div>
			<h2 className="mb-2 text-3xl">{countryName}</h2>

			{Object.keys(providersForCountry).map((type: string) => (
				<CategoryProvidersComponent
					key={type}
					type={type}
					category={providersForCountry[type]}
				/>
			))}
		</div>
	</div>
)

export default CountryWatchProviders
