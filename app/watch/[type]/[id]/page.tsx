import Backdrop from "@/globals/components/backdrop"
import ScrollToTop from "@/globals/components/scroll-top"
import { ImagesObject } from "@/globals/types"
import TitleInfo from "@/sections/details/title-info"
import TitleOffers from "@/sections/details/title-providers"
import { createApiRequest } from "@/utils/tmdb/tmdb-api"
import { notFound } from "next/navigation"

export default async function WatchPage({
	params
}: {
	params: Promise<{ type: string; id: string }>
}) {
	const { type, id } = await params
	const mediaType = type === "movie" || type === "tv" ? type : null
	const mediaId = Number(id)

	if (!mediaType || !Number.isInteger(mediaId)) notFound()

	const getBackdropIndex = (length: number) => {
		if (!length) return null

		return mediaId % length
	}

	// Get all available images
	const images: ImagesObject | undefined = await createApiRequest(
		`/${mediaType}/${mediaId}/images`
	)
	const index: number | null | undefined =
		images && getBackdropIndex(images.backdrops.length)
	const backdrop: string | undefined =
		index === null || index === undefined
			? undefined
			: images?.backdrops[index]?.file_path

	return (
		<>
			{backdrop && <Backdrop image={backdrop} />}
			<span className="fixed right-5 bottom-2 bg-black text-white opacity-25">
				Provided by{" "}
				<a
					href="https://www.justwatch.com"
					target="_blank"
					rel="nofollow noopen"
				>
					JustWatch
				</a>
			</span>
			<div className="container mx-4 mt-5 max-w-7xl text-white md:mx-auto md:mt-10">
				<TitleInfo type={mediaType} id={mediaId} />
				<TitleOffers type={mediaType} id={mediaId} />
				<ScrollToTop />
			</div>
		</>
	)
}
