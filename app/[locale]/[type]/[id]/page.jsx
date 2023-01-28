import Image from "next/image"
import { getMovieInfo, getMovieData } from "../../../../utils/justwatch"
import MovieProvider from '../../../../components/movie-provider'
import Backdrop from "../../../../components/backdrop"

const MovieDetails = async ({ params }) => {
	const { id, type, locale } = params

	const movie = await getMovieInfo(id, type, locale)
	const data = await getMovieData(id, type)

	return (
		<>
			<Backdrop id={movie.backdrops} slug={movie.slug} />

			<div className="container">
				<div className="row">
					<div className="col-12 col-md-3">
						<Image
							src={movie.poster}
							width="592"
							height="841"
							alt={movie.title}
							style={{ objectFit: "contain" }}
						/>
					</div>

					<div className="col-12 col-md-9">
						<h1>{movie.title}</h1>

						<h2 className="title-year">
							{movie.object_type} / {movie.original_release_year}
						</h2>
						<p className="offer-short-description">
							{movie.short_description}
						</p>

						<h2 className="title-cast">Cast</h2>
						<div className="row d-flex">
							{movie.credits &&
								movie.credits.slice(0, 5).map((credit) => (
									<div
										key={credit.person_id}
										className="col-12 col-md-4 actor"
									>
										<p className="actor-name">
											{credit.name}
										</p>
										<p className="actor-character">
											{credit.character_name}
										</p>
									</div>
								))}
						</div>
					</div>
				</div>

				<section className="row offers-available">
					{data.map((provider, key) => (
						<MovieProvider key={key} provider={provider} />
					))}
				</section>
			</div>
		</>
	)
}

export default MovieDetails
