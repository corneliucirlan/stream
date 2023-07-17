import { API_IMAGES_URL } from "../utils/justwatch"
import BackdropData from "../utils/interface/backdrop"

export default ({ id, slug }: BackdropData) => {
	return (
		<div
			className="bg-image"
			style={{
				backgroundImage: `url(${API_IMAGES_URL}/backdrop/${id}/s1920/${slug})`,
			}}
		/>
	)
}
