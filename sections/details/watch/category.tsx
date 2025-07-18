import { CountryProviders, WatchProvider } from "@/globals/types"

import Provider from "@/sections/details/watch/provider"

const CategoryProvidersComponent = ({
	type,
	category
}: {
	type: string
	category: WatchProvider[]
}) => (
	<article>
		<h3 className="mt-2 text-2xl capitalize">{type}</h3>
		{category.map((watch: WatchProvider) => (
			<Provider key={watch.provider_id} watch={watch} />
		))}
	</article>
)

export default CategoryProvidersComponent
