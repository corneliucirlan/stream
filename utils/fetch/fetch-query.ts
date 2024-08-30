"use server"

import { JUSTWATCH_IMAGE_URL } from "@/utils/fetch/fetch-globals"
import { SearchResult } from "@/utils/types"
import { getPhotoID } from "@/utils/photo"
import { initBrowser } from "../puppeteer"
import querySearch from "../query/query-search"

const fetchData = async (
	searchQuery: string,
	searchLocale: string
): Promise<SearchResult[]> => {
	// Extract language and country codes
	const [languageCode, countryCode] = searchLocale.split("_")

	const response = await initBrowser(
		querySearch(languageCode, countryCode, searchQuery)
	)

	const searchResults = response?.data?.popularTitles?.edges?.map(
		(result: any) => {
			return {
				id: result.node.objectId,
				title: result.node.content.title,
				fullPath: result.node.content.fullPath,
				type: result.node.objectType,
				poster: `${JUSTWATCH_IMAGE_URL}/poster/${getPhotoID(
					result.node.content.posterUrl
				)}/s592/poster.webp`,
				locale: searchLocale,
				releaseYear: result.node.content.originalReleaseYear
			}
		}
	)

	return searchResults
}

export default fetchData
