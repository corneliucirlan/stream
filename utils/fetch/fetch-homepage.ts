"use server"

import { BackdropType } from "@/globals/types"
import { getRandomBackdropID } from "@/utils/photo"
import { initBrowser } from "../puppeteer"
import queryHomepage from "@/utils/query/query-homepage"

const fetchHomepagePhoto = async (): Promise<BackdropType> => {
	const response = await initBrowser(queryHomepage)

	// Backdrop ID regex
	const regex = /\s*([0-9]+)/

	// All available backdrops
	let backdrops = response.data.popularTitles.edges[0].node.content.backdrops

	// Get list of IDs
	const backdropsIDs: number[] = backdrops.map(
		(b: any) => regex.exec(b.backdropUrl)?.[0]
	)

	return {
		id: backdropsIDs && getRandomBackdropID(backdropsIDs),
		slug: response.data.popularTitles.edges[0].node.content.fullPath
			.split("/")
			.pop()
	}
}

export default fetchHomepagePhoto
