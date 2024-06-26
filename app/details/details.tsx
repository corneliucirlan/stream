import Link from "next/link"
import Image from "next/image"
import { getRandomBackdropID } from "@/utils/photo"
import Backdrop from "@/components/backdrop"
import fetchTitleDetails from "@/utils/fetch/fetch-details"

const getTraktUrl = async (imdbId: string, type: string): Promise<URL> => {
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

	// IMDb ID not found on Trakt.tv
	if (!result) return new URL("https://trakt.tv")

	const slug =
		type === "show" ? result?.show?.ids?.slug : result?.movie?.ids?.slug

	// Construct the Trakt.tv URL
	const traktUrl: URL = new URL(`https://trakt.tv/${type}s/${slug}`)

	// Return Trakt.tv link
	return traktUrl
}

const TitleDetails = async ({
	type,
	locale,
	fullPath
}: {
	type: string
	locale: string
	fullPath: string
}) => {
	const title = await fetchTitleDetails(locale, fullPath)

	// Get Trakt.tv URL
	const traktURL = await getTraktUrl(title.imdb, type.toLowerCase())
	return (
		<div className="flex">
			<Backdrop
				id={getRandomBackdropID(title.backdrops)}
				slug={`${title.slug}.webp`}
			/>
			<div className="mr-4 w-1/4">
				<Image
					src={title.poster}
					width="592"
					height="841"
					alt={title.title}
					priority={true}
				/>
			</div>

			<div className="w-3/4">
				<Link
					href={traktURL.href}
					target="_blank"
					title={`Open Trakt.tv page for "${title.title}"`}
				>
					<h1 className="text-h1 font-bold">{title.title}</h1>
				</Link>

				<h2 className="mt-2 text-h2 uppercase">
					{title.releaseYear} / {type}{" "}
					{title.seasons &&
						`/ ${title.seasons} season${
							title.seasons === 1 ? "" : "s"
						}`}
				</h2>
				<p className="mt-2">{title.description}</p>

				<h2 className="mb-1 mt-4 text-h2">Cast</h2>
				<div className="flex">
					{title?.credits?.slice(0, 5).map((credit: any) => (
						<div key={credit.name} className="flex-auto">
							<p className="font-semibold text-gray-500">
								{credit.name}
							</p>
							<p className="">{credit.characterName}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default TitleDetails
