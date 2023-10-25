import CountryComponent from "@/app/search/country"
import Query from "@/app/search/query"
import SearchResults from "@/app/search/results"
import Backdrop from "@/components/backdrop"
import fetchHomepagePhoto from "@/utils/fetch/fetch-popular"

const Home = async () => {
	const { id, slug } = await fetchHomepagePhoto()

	return (
		<div className="container">
			<Backdrop id={id} slug={slug} />

			<div className="row justify-content-center search-box">
				<CountryComponent />
				<Query />
			</div>

			<SearchResults />
		</div>
	)
}

export default Home
