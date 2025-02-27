import Backdrop from "@/globals/components/backdrop"

import homepageBackdrop from "@/utils/tmdb/homepage-backdrop"

import SearchQuery from "@/sections/home/search-query"
import SearchResults from "@/sections/home/search-results"

const Home = async () => {
	const image: string | undefined = await homepageBackdrop()
	return (
		<div className="container mx-auto max-w-7xl">
			{image && <Backdrop image={image} />}

			<SearchQuery />

			<SearchResults />
		</div>
	)
}

export default Home
