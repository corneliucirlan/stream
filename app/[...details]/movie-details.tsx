import Image from "next/image"
import { getMovieDetails } from "../../utils/justwatch"
import Link from "next/link"

const getTraktUrl = async (
	imdbId: string,
	type: string
): Promise<URL | null> => {
	const BASE_URL = "https://api.trakt.tv"
	const headers = new Headers({
		"Content-Type": "application/json",
		"trakt-api-version": "2",
		"trakt-api-key": process.env.TRAKT_CLIENT_ID || ""
	})
	const response = await fetch(`${BASE_URL}/search/imdb/${imdbId}`, {
		method: "GET",
		headers
	})
	const data = await response.json()

	// Assuming the first result is the most relevant
	const result = data[0]

	if (!result) {
		return null // IMDb ID not found on Trakt.tv
	}

	const slug = type === "show" ? result.show.ids.slug : result.movie.ids.slug

	// Construct the Trakt.tv URL
	const traktUrl: URL = new URL(`https://trakt.tv/${type}s/${slug}`)

	return traktUrl
}

export default async ({
	id,
	type,
	locale
}: {
	id: number
	type: string
	locale: string
}) => {
	// Get movie details
	const movie = await getMovieDetails(id, type, locale)

	// Get Trakt.tv URL
	const traktURL = await getTraktUrl(movie.imdb, type)

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
				<Link
					href={traktURL ? traktURL : "#"}
					target="_blank"
					title={`Open Trakt.tv page for "${movie.title}"`}
				>
					<h1>{movie.title}</h1>
				</Link>

				<h2 className="title-year">
					{movie.object_type} / {movie.original_release_year}
				</h2>
				<p className="offer-short-description">
					{movie.short_description}
				</p>

				<h2 className="title-cast">Cast</h2>
				<div className="row d-flex">
					{movie?.credits?.slice(0, 5).map(credit => (
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
