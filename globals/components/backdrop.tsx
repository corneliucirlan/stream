import { JUSTWATCH_IMAGE_URL } from "@/utils/fetch/fetch-globals"
import { BackdropType } from "@/globals/types"

const Backdrop = async ({ id, slug }: BackdropType) => (
	<div
		className="after:inset-y-o fixed inset-x-0 inset-y-0 -z-10 bg-cover bg-center after:absolute after:inset-x-0 after:h-screen after:w-screen after:bg-black after:opacity-80 after:content-['']"
		style={{
			backgroundImage: `url(${JUSTWATCH_IMAGE_URL}/backdrop/${id}/s1920/${slug})`
		}}
	/>
)

export default Backdrop
