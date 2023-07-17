import { getMovieDetails, getRandomBackdropID } from "../../utils/justwatch"
import Backdrop from "../../components/backdrop"
import MovieDetails from "./movie-details"
import Offers from "./offers/offers"

export default async ({
	params
}: {
	params: { details: [string, string, number] }
}) => {
	const [locale, type, id] = params.details

	const movie = await getMovieDetails(id, type, locale)
	return (
		<>
			<Backdrop
				id={getRandomBackdropID(movie.backdrops)}
				slug={movie.slug}
			/>

			<div className="container">
				<MovieDetails id={id} type={type} locale={locale} />

				<Offers id={id} type={type} />
			</div>
		</>
	)
}
