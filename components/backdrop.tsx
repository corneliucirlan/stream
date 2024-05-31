import { JUSTWATCH_IMAGE_URL } from "@/utils/fetch/fetch-globals"
import { BackdropType } from "@/utils/types"

const Backdrop = async ({ id, slug }: BackdropType) => (
	<div
		className="fixed inset-x-0 inset-y-0 -z-10 bg-cover bg-center after:content-[''] after:absolute after:inset-x-0 after:inset-y-o after:bg-black after:w-screen after:h-screen after:opacity-80"
		style={{
			backgroundImage: `url(${JUSTWATCH_IMAGE_URL}/backdrop/${id}/s1920/${slug})`
		}}
	/>
)

export default Backdrop
