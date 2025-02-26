import { baseURLImage } from "@/utils/tmdb/tmdb-api"

const Backdrop = async ({ image }: { image: string }) => (
	<div
		className="after:inset-y-o fixed inset-x-0 inset-y-0 -z-10 bg-cover bg-center after:absolute after:inset-x-0 after:h-screen after:w-screen after:bg-black after:opacity-80 after:content-['']"
		style={{
			backgroundImage: `url(${baseURLImage}${image})`
		}}
	/>
)

export default Backdrop
