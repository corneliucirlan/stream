// Get background image
import { getAllCountries, getHomepageBackdrop } from "../utils/justwatch"
import Backdrop from "../components/backdrop"

// Search
import Search from "./search"

export default async () => {
	const countries = await getAllCountries()
	const [ids, slug] = await getHomepageBackdrop()

	return (
		<>
			<Backdrop id={ids} slug={slug} />

			<Search countries={countries} />
		</>
	)
}
