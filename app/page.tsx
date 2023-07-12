// Get background image
import {
	getAllCountries,
	Country,
	getAllProviders,
} from "../utils/ts-justwatch"
import { getMovieData } from "../utils/justwatch"
import { getHomepageBackdrop } from "../utils/justwatch"
import Backdrop from "../components/backdrop"

// Search
import Search from "./search"

export default async () => {
	const countries: Country[] = await getAllCountries()
	const [ids, slug] = await getHomepageBackdrop()

	// await getAllOffersForMovie(475372, "movie")

	// await getMovieProviders(475372, "movie")
	await getMovieData(475372, "movie")

	return (
		<>
			<Backdrop id={ids} slug={slug} />

			{/* <Search /> */}
		</>
	)
}
