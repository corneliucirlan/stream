import Backdrop from "@/components/backdrop"
import fetchCountries from "@/utils/fetch/fetch-countries"
import fetchHomepagePhoto from "@/utils/fetch/fetch-homepage"
import SearchForm from "@/app/search/search-form"

const Home = async () => {
	const { id, slug } = await fetchHomepagePhoto()
	const countries = await fetchCountries()

	return (
		<div className="container mx-auto max-w-7xl">
			<Backdrop id={id} slug={slug} />

			<SearchForm countries={countries} />
		</div>
	)
}

export default Home
