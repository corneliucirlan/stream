import { BackdropType } from "@/utils/types"
import { getRandomBackdropID } from "@/utils/photo"
import { getBackgroundImage } from "../puppeteer"

const fetchHomepagePhoto = async (): Promise<BackdropType> => {
	const data = await getBackgroundImage()

	// Backdrop ID regex
	const regex = /\s*([0-9]+)/

	// All available backdrops
	let backdrops = data.data.popularTitles.edges[0].node.content.backdrops

	// Get list of IDs
	const backdropsIDs: number[] = backdrops.map(
		(b: any) => regex.exec(b.backdropUrl)?.[0]
	)

	return {
		id: backdropsIDs && getRandomBackdropID(backdropsIDs),
		slug: data.data.popularTitles.edges[0].node.content.fullPath
			.split("/")
			.pop()
	}
}

export default fetchHomepagePhoto
