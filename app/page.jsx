// Get background image
import { getAllCountries, getHomepageBackdrop } from "../utils/justwatch"

// Search
import Search from "../components/search"

const Page = async () => {
	const countries = await getAllCountries()
	const backgroundImageURL = await getHomepageBackdrop()

	return (
		<>
			<div
				className="bg-image bg-image-frontpage"
				style={{
					backgroundImage: `url(${backgroundImageURL}`
				}}
			/>

			<Search countries={countries} />
		</>
	)
}

export default Page
