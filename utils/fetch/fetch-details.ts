"use server"

import { Details } from "@/globals/types"
import { getPhotoID } from "@/utils/photo"
import { initBrowser } from "../puppeteer"
import queryTitleDetails from "../query/query-details"

const fetchTitleDetails = async (
	locale: string,
	fullPath: string
): Promise<Details> => {
	// Extract language and country codes
	const [languageCode, countryCode] = locale.split("_")

	// Return data
	const response = await initBrowser(
		queryTitleDetails(fullPath, languageCode, countryCode)
	)

	const backdrops: number[] = response.data.urlV2.node.content.backdrops.map(
		(backdrop: any) => getPhotoID(backdrop.backdropUrl)
	)

	return {
		title: response.data.urlV2.node.content.title,
		poster: `https://images.justwatch.com${response.data.urlV2.node.content.fullPosterUrl}`,
		releaseYear: response.data.urlV2.node.content.originalReleaseYear,
		seasons: response?.data?.urlV2?.node?.seasons?.length,
		description: response.data.urlV2.node.content.shortDescription,
		credits: response.data.urlV2.node.content.credits.map((credit: any) => {
			return {
				name: credit.name,
				characterName: credit.characterName
			}
		}),
		backdrops: backdrops,
		slug: response.data.urlV2.node.content.fullPath.split("/").pop(),
		imdb: response.data.urlV2.node.content.externalIds.imdbId,
		...(response.data.urlV2.node.content.upcomingReleases.length > 0 && {
			continuing: true
		})
	}
}

export default fetchTitleDetails
