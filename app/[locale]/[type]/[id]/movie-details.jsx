import Image from "next/image"
import { getMovieInfo } from "../../../../utils/justwatch"

const MovieDetails = async ({ id, type, locale }) => {

	// Get movie details
	const movie = await getMovieInfo(id, type, locale)

	return (
		<div className="row">
			<div className="col-12 col-md-3">
				<Image
					src={movie.poster}
					width="592"
					height="841"
					alt={movie.title}
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
								<p className="actor-name">{credit.name}</p>
								<p className="actor-character">
									{credit.character_name}
								</p>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default MovieDetails
