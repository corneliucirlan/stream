import Image from "next/image"
import Link from "next/link"

import { baseURLImage, createApiRequest } from "@/utils/tmdb/tmdb-api"
import { TitleDetails, TitleCredits } from "@/globals/types"
import getTraktUrl from "@/utils/trakt/trakt-url"

const TitleInfo = async ({ type, id }: { type: string; id: number }) => {
	const titleDetails: TitleDetails | undefined =
		await createApiRequest<TitleDetails>(`/${type}/${id}`)

	const titleCredits: TitleCredits | undefined =
		await createApiRequest<TitleCredits>(`/${type}/${id}/credits`)

	const titleCast = titleCredits?.cast
		.slice(0, 30)
		.map((cast) => cast.name)
		.join(", ")

	const traktURL: string | null = titleDetails?.imdb_id
		? await getTraktUrl(titleDetails.imdb_id, type)
		: null

	return (
		<div className="flex flex-col md:flex-row">
			<div className="mr-4 mb-10 w-full md:mb-0 md:w-1/4">
				<Image
					src={baseURLImage + titleDetails?.poster_path}
					width="592"
					height="841"
					alt={
						type == "tv"
							? (titleDetails?.name ?? "TV Poster")
							: (titleDetails?.title ?? "Movie Poster")
					}
					priority={true}
				/>
			</div>

			<div className="w-full md:w-3/4">
				<Link
					href={traktURL ?? "https://trakt.tv"}
					target="_blank"
					title={`Open Trakt.tv page"`}
				>
					<h1 className="text-5xl font-bold">
						{type == "tv"
							? titleDetails?.name
							: titleDetails?.title}
					</h1>
				</Link>

				<span className="text-h4 mt-2 text-gray-500 uppercase">
					{titleDetails &&
					(titleDetails.first_air_date ||
						titleDetails.release_date) ? (
						<>
							{type === "tv"
								? titleDetails.first_air_date?.slice(0, 4)
								: titleDetails.release_date?.slice(0, 4)}
							{` / ${type} `}
						</>
					) : (
						" / " + type + " "
					)}
					{titleDetails?.number_of_seasons &&
						`/ ${titleDetails.number_of_seasons} season${
							titleDetails.number_of_seasons === 1 ? "" : "s"
						}`}
					{type === "tv" && titleDetails?.status
						? ` / ${titleDetails.status}`
						: ""}
				</span>
				<p className="mt-2">{titleDetails?.overview}</p>

				<h2 className="mt-4 mb-1 text-3xl">Cast</h2>
				{titleCast}
			</div>
		</div>
	)
}

export default TitleInfo
