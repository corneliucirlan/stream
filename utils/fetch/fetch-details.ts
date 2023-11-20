import { JUSTWATCH_GRAPH_URL, fetchOptions } from "@/utils/fetch/fetch-globals"
import { Details } from "@/utils/types"
import { getPhotoID } from "@/utils/photo"
import { getTitleDetails } from "@/utils/puppeteer"

const fetchTitleDetails = async (
	locale: string,
	fullPath: string
): Promise<Details> => {
	const response = await getTitleDetails(locale, fullPath)

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
		imdb: response.data.urlV2.node.content.externalIds.imdbId
	}
}

export default fetchTitleDetails
