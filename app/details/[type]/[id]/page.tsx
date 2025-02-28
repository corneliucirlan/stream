import Backdrop from "@/globals/components/backdrop"
import ScrollToTop from "@/globals/components/scroll-top"
import { ImagesObject } from "@/globals/types"
import TitleInfo from "@/sections/details/title-info"
import TitleOffers from "@/sections/details/title-providers"
import { createApiRequest } from "@/utils/tmdb/tmdb-api"

const DetailsPage = async ({
	params
}: {
	params: Promise<{ type: string; id: number }>
}) => {
	const { type, id } = await params

	const getRandomArrayIndex = (length: number) => {
		if (!length) {
			return null
		}

		const randomIndex = Math.floor(Math.random() * length)
		return randomIndex
	}

	// Get all available images
	const images: ImagesObject | undefined = await createApiRequest(
		`/${type}/${id}/images`
	)
	const index: number | null | undefined =
		images && getRandomArrayIndex(images.backdrops.length)
	const backdrop: string | 0 | null | undefined =
		index && images && images.backdrops[index].file_path

	return (
		<>
			{backdrop && <Backdrop image={backdrop} />}
			<span className="fixed right-5 top-5 bg-black text-white opacity-25">
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
				<TitleInfo type={type} id={id} />
				<TitleOffers type={type} id={id} />
				<ScrollToTop />
			</div>
		</>
	)
}

export default DetailsPage
