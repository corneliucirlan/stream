import { ProviderProps } from "@/globals/types"
import Image from "next/image"
import { baseURLImage } from "@/utils/tmdb/tmdb-api"

export default ({ watch, availableSeasons = [] }: ProviderProps) => {
	// Sort seasons numerically for a cleaner display
	const sortedSeasons = [...availableSeasons].sort((a, b) => a - b)

	return (
		<div className="inline-flex w-28 flex-col items-center p-2 text-center">
			<div className="group relative">
				<Image
					src={baseURLImage + watch.logo_path}
					width={50}
					height={50}
					alt={watch.provider_name}
					className="rounded-xl shadow-md transition-transform group-hover:scale-105"
					style={{
						width: "50px",
						height: "50px"
					}}
				/>
			</div>

			<p className="mt-2 line-clamp-2 min-h-8 text-xs font-medium">
				{watch.provider_name}
			</p>

			{/* Display Season availability if it exists */}
			{sortedSeasons.length > 0 && (
				<div className="mt-1 flex flex-wrap justify-center gap-1">
					<span className="text-md tracking-wider uppercase opacity-60">
						{sortedSeasons.length === 1
							? `S${sortedSeasons[0]}`
							: `S${sortedSeasons[0]}-${sortedSeasons[sortedSeasons.length - 1]}`}
					</span>
				</div>
			)}
		</div>
	)
}
