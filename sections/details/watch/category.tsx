import { CategoryProvidersProps } from "@/globals/types"
import Provider from "@/sections/details/watch/provider"

export default function CategoryProvidersComponent({
	type,
	category,
	seasons
}: CategoryProvidersProps) {
	return (
		<article className="mb-6">
			<h3 className="mt-4 mb-2 text-xl font-semibold capitalize opacity-80">
				{type.replace("_", " ")}
			</h3>

			<div className="flex flex-wrap gap-4">
				{category.map(watch => {
					const availableInSeasons = seasons
						.filter(s =>
							s.providers?.some(
								item => item.provider_id === watch.provider_id
							)
						)
						.map(s => s.season_number)

					return (
						<Provider
							key={watch.provider_id}
							watch={watch}
							availableSeasons={availableInSeasons}
						/>
					)
				})}
			</div>
		</article>
	)
}
