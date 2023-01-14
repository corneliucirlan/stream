import { useEffect, useState } from "react"

import Image from "next/image"
import { getMovieInfo, getMovieData } from "../utils/justwatch"
import MovieProvider from "../components/movie-rovider"

export const getServerSideProps = async (context) => ({
	props: {
		movie: await getMovieInfo(context.query.id, context.query.type, "en_US"),
		data: await getMovieData(context.query.id, context.query.type)
	}
})

export default ({ movie, data }) => {

	// Loading the movie
	if (!movie) return <div>Loading</div>

	// Background image
	let [ backgroundImage, setBackgroundImage ] = useState()

	// Set background image
	useEffect(() => {
		setBackgroundImage(
			`url(https://images.justwatch.com/backdrop/${
				movie.backdrops[
					Math.floor(Math.random() * movie.backdrops.length)
				]
			}/s1920/${movie.slug})`
		);
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
