import Link from "next/link"
import Image from "next/image"

import Backdrop from "@/globals/components/backdrop"
import { getRandomBackdropID } from "@/utils/photo"
import fetchTitleDetails from "@/utils/fetch/fetch-details"
import getTraktUrl from "@/utils/trakt"

const TitleInfo = async ({
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

	const credits = title?.credits
		?.slice(0, 20)
		.map((credit: any) => credit.name)
	const titleCredits = credits.join(", ").replace(/,([^,]*)$/, " and$1")

	return (
		<div className="flex flex-col md:flex-row">
			<Backdrop
				id={getRandomBackdropID(title.backdrops)}
				slug={`${title.slug}.webp`}
			/>
			<div className="mb-10 mr-4 w-full md:mb-0 md:w-1/4">
				<Image
					src={title.poster}
					width="592"
					height="841"
					alt={title.title}
					priority={true}
				/>
			</div>

			<div className="w-full md:w-3/4">
				<Link
					href={traktURL.href}
					target="_blank"
					title={`Open Trakt.tv page for "${title.title}"`}
				>
					<h1 className="text-h1 font-bold">{title.title}</h1>
				</Link>

				<span className="text-h4 mt-2 uppercase text-gray-500">
					{title.releaseYear} / {type}{" "}
					{title.seasons &&
						`/ ${title.seasons} season${
							title.seasons === 1 ? "" : "s"
						}`}
					{type === "SHOW" &&
						(title.continuing ? " / CONTINUING" : " / ENDED")}
				</span>
				<p className="mt-2">{title.description}</p>

				<h2 className="mb-1 mt-4 text-h2">Cast</h2>
				{titleCredits}

				{/* <div className="flex">
					{title?.credits?.slice(0, 5).map((credit: any) => (
						<div key={credit.name} className="flex-auto">
							<p className="font-semibold text-gray-500">
								{credit.name}
							</p>
							<p className="">{credit.characterName}</p>
						</div>
					))}
				</div> */}
			</div>
		</div>
	)
}

export default TitleInfo
