import { useEffect, useState } from "react"

import Image from "next/image"
import { getMovieInfo, getMovieData, getRandomBackdropID, API_IMAGES_URL } from "../utils/justwatch"
import MovieProvider from "../components/movie-rovider"

export const getServerSideProps = async ({ query }) => ({
	props: {
		movie: await getMovieInfo(query.id, query.type, query.locale),
		data: await getMovieData(query.id, query.type)
	}
})

export default ({ movie, data }) => {

	// Filter out empty elements
	data = data.filter(result => Object.entries(result.offers).length > 0)

	// Loading the movie
	if (!movie) return <div>Loading</div>

	// Background image
	let [ backgroundImage, setBackgroundImage ] = useState()

	// Set background image
	useEffect(() => {
		setBackgroundImage(
			`url(${API_IMAGES_URL}/backdrop/${
				getRandomBackdropID(movie.backdrops)
			}/s1920/${movie.slug})`
		)
	}, [])

	return (
		<>
			<div
				className="bg-image"
				style={{
					backgroundImage: backgroundImage,
				}}
			></div>
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
						<p className="offer-type">
							{movie.object_type} / {movie.original_release_year}
						</p>
						<p className="offer-short-description">
							{movie.short_description}
						</p>
						<h5 className="offer-cast-title">Cast</h5>
						<div className="row d-flex">
							{movie.credits.slice(0, 3).map((credit) => (
								<div key={credit.person_id} className="col-4">
									<p className="actor-name">{credit.name}</p>
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
