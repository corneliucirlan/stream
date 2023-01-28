import { API_IMAGES_URL, getRandomBackdropID } from "../utils/justwatch"

export default ({ id, slug }) => {
	return (
		<div
			className="bg-image"
			style={{
				backgroundImage: `url(${API_IMAGES_URL}/backdrop/${getRandomBackdropID(id)}/s1920/${slug})`,
			}}
		/>
	)
}
