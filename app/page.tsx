// Get background image
import { getHomepageBackdrop } from "../utils/justwatch"
import Backdrop from "../components/backdrop"

// Search
import Search from "./search"

export default async () => {
	const { id, slug } = await getHomepageBackdrop()

	return (
		<>
			<Backdrop id={id} slug={slug} />

			<Search />
		</>
	)
}
