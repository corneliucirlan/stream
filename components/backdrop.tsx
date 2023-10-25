import { JUSTWATCH_IMAGE_URL } from "@/utils/fetch/fetch-globals"
import { BackdropType } from "@/utils/types"

const Backdrop = async ({ id, slug }: BackdropType) => (
	<div
		className="bg-image"
		style={{
			backgroundImage: `url(${JUSTWATCH_IMAGE_URL}/backdrop/${id}/s1920/${slug})`
		}}
	/>
)

export default Backdrop
