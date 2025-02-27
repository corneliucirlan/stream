import { CountryProviders } from "@/globals/types"

import CategoryProviders from "@/sections/details/watch/category"

export default ({
	countryName,
	providersForCountry
}: {
	countryName: string
	providersForCountry: CountryProviders
}) => (
	<div className="relative mb-8 rounded-xl bg-white bg-opacity-5 p-12 pb-4">
		<div>
			<h2 className="mb-2 text-h2">{countryName}</h2>

			{Object.keys(providersForCountry).map((type: string) => (
				<CategoryProviders
					key={type}
					type={type}
					category={providersForCountry[type]}
				/>
			))}
		</div>
	</div>
)
