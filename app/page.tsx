import CountryComponent from "@/app/search/country"
import Query from "@/app/search/query"
import SearchResults from "@/app/search/results"
import Backdrop from "@/components/backdrop"
import fetchCountries from "@/utils/fetch/fetch-countries"
import fetchHomepagePhoto from "@/utils/fetch/fetch-popular"
import Form from "./search/form"

const Home = async () => {
	const { id, slug } = await fetchHomepagePhoto()
	const countries = await fetchCountries()

	return (
		<div className="container mx-auto max-w-7xl">
			<Backdrop id={id} slug={slug} />

			<Form countries={countries} />

			{/* <div className="row justify-content-center search-box">
				<CountryComponent />
				<Query />
			</div>

			<SearchResults /> */}
		</div>
	)
}

export default Home
