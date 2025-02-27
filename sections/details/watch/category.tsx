import { CountryProviders, WatchProvider } from "@/globals/types"

import Provider from "@/sections/details/watch/provider"

export default ({
	type,
	category
}: {
	type: string
	category: WatchProvider[]
}) => (
	<article className="">
		<h3 className="mt-2 text-h3 capitalize">{type}</h3>
		{category.map((watch: WatchProvider) => (
			<Provider key={watch.provider_id} watch={watch} />
		))}
	</article>
)
