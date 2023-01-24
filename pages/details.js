import Head from "next/head"
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
			<Head>
				<title>Stream {movie.title}</title>
				<meta
					name="description"
					content={`Globally available streaming options for "${movie.title}" ${
						movie.object_type == "movie" ? "movie" : "TV show"
					}`}
				/>
			</Head>

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

						<h2 className="title-year">{movie.object_type} / {movie.original_release_year}</h2>
						<p className="offer-short-description">{movie.short_description}</p>

						<h2 className="title-cast">Cast</h2>
						<div className="row d-flex">
							{movie.credits.slice(0, 5).map((credit) => (
								<div
									key={credit.person_id}
									className="col-12 col-md-4 actor"
								>
									<p className="actor-name">{credit.name}</p>
									<p className="actor-character">{credit.character_name}</p>
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
