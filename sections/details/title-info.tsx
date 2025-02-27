import Image from "next/image"

import Backdrop from "@/globals/components/backdrop"
import { baseURLImage, createApiRequest } from "@/utils/tmdb/tmdb-api"
import { TitleDetails, TitleCredits } from "@/globals/types"

const TitleInfo = async ({ type, id }: { type: string; id: number }) => {
	const titleDetails: TitleDetails | undefined =
		await createApiRequest<TitleDetails>(`/${type}/${id}`)
	let titleCredits: TitleCredits | undefined =
		await createApiRequest<TitleCredits>(`/${type}/${id}/credits`)
	const titleCast = titleCredits?.cast
		.slice(0, 30)
		.map((cast: any) => cast.name)
		.join(", ")
	const backdrop: string | null | undefined = titleDetails?.backdrop_path

	return (
		<div className="flex flex-col md:flex-row">
			{backdrop && <Backdrop image={backdrop} />}
			<div className="mb-10 mr-4 w-full md:mb-0 md:w-1/4">
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
				<h1 className="text-h1 font-bold">
					{type == "tv" ? titleDetails?.name : titleDetails?.title}
				</h1>

				<span className="text-h4 mt-2 uppercase text-gray-500">
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

				<h2 className="mb-1 mt-4 text-h2">Cast</h2>
				{titleCast}
			</div>
		</div>
	)
}

export default TitleInfo
