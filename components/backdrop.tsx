import { API_IMAGES_URL, getRandomBackdropID } from "../utils/justwatch"

interface BGData {
	id: Array<number>,
	slug: string
}

export default ({ id, slug }: BGData) => {
	return (
		<div
			className="bg-image"
			style={{
				backgroundImage: `url(${API_IMAGES_URL}/backdrop/${getRandomBackdropID(
					id
				)}/s1920/${slug})`,
			}}
		/>
	)
}
