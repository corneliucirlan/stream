import ScrollToTop from "@/globals/components/scroll-top"
import TitleInfo from "@/sections/details/title-info"
import TitleOffers from "@/sections/details/title-providers"

const DetailsPage = async ({
	params
}: {
	params: Promise<{ id: number; type: string }>
}) => {
	const { id, type } = await params

	// let response = await fetch(
	// 	`https://api.themoviedb.org/3/movie/550?api_key=${process.env.TMDB_API}`
	// )
	// let x = await response.json()
	// console.log("API: ", x)
	// response = await fetch(`${baseURL}/movie/550`, baseOptions)
	// x = await response.json()
	// console.log("API 2: ", x)

	return (
		<>
			<span className="fixed right-5 top-5 text-white opacity-25">
				Provided by{" "}
				<a
					href="https://www.justwatch.com"
					target="_blank"
					rel="nofollow noopen"
				>
					JustWatch
				</a>
			</span>
			<div className="container mx-4 mt-5 max-w-7xl text-white md:mx-auto md:mt-10">
				<TitleInfo type={type} id={id} />
				<TitleOffers type={type} id={id} />
				<ScrollToTop />
			</div>
		</>
	)
}

export default DetailsPage
