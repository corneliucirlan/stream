import { getMovieInfo, getMovieData } from "../../../../utils/justwatch"
import StreamCountry from "../../../../components/stream/stream-country"
import Backdrop from "../../../../components/backdrop"
import MovieDetails from "./movie-details"

const MoviePage = async ({ params }) => {
	const { id, type, locale } = params

	const movie = await getMovieInfo(id, type, locale)
	const data = await getMovieData(id, type)

	return (
		<>
			<Backdrop id={movie.backdrops} slug={movie.slug} />

			<div className="container">
				<MovieDetails id={id} type={type} locale={locale} />

				<section className="row offers-available">
					{data.map((provider, key) => (
						<StreamCountry key={key} provider={provider} />
					))}
				</section>
			</div>
		</>
	)
}

export default MoviePage
