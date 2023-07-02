import { getMovieInfo } from "../../utils/justwatch"
import Backdrop from "../../components/backdrop"
import MovieDetails from "./movie-details"
import Offers from "./offers/offers"

const MoviePage = async ({ params }) => {
	const [locale, type, id] = params.details

	const movie = await getMovieInfo(id, type, locale)
	return (
		<>
			<Backdrop id={movie.backdrops} slug={movie.slug} />

			<div className="container">
				<MovieDetails id={id} type={type} locale={locale} />

				<Offers id={id} type={type} />
			</div>
		</>
	)
}

export default MoviePage
