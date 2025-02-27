import { WatchProvider } from "@/globals/types"
import Image from "next/image"
import { baseURLImage } from "@/utils/tmdb/tmdb-api"

export default ({ watch }: { watch: WatchProvider }) => (
	<div className="inline-flex w-28 flex-col items-center justify-items-center p-4 text-center">
		<Image
			src={baseURLImage + watch.logo_path}
			width={50}
			height={50}
			alt={watch.provider_name}
			style={{
				width: "50px",
				height: "50px",
				borderRadius: "25%"
			}}
		/>
		<p className="my-2">{watch.provider_name}</p>
	</div>
)
