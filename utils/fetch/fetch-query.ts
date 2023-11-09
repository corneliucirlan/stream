import {
	fetchOptions,
	JUSTWATCH_GRAPH_URL,
	JUSTWATCH_IMAGE_URL
} from "@/utils/fetch/fetch-globals"
import { SearchResult } from "@/utils/types"
import { getPhotoID } from "@/utils/photo"
import { searchMovie } from "../puppeteer"

const fetchData = async (
	query: string,
	locale: string,
	controller: AbortController
): Promise<SearchResult[]> => {
	const [languageCode, countryCode] = locale.split("_")

	const commonQueryVariables = {
		country: countryCode,
		language: languageCode,
		first: 18
	}

	const getSuggestedTitlesQuery = {
		operationName: "GetSuggestedTitles",
		variables: {
			...commonQueryVariables,
			filter: {
				searchQuery: query
			}
		},
		query: `query GetSuggestedTitles($country: Country!, $language: Language!, $first: Int!, $filter: TitleFilter) {
		popularTitles(country: $country, first: $first, filter: $filter) {
			edges {
				node {
					...SuggestedTitle
					__typename
				}
				__typename
			}
			__typename
		}
	}
	
	fragment SuggestedTitle on MovieOrShow {
		id
		objectType
		objectId
		content(country: $country, language: $language) {
			fullPath
			title
			originalReleaseYear
			posterUrl
			fullPath
			__typename
		}
		__typename
	}
	`
	}

	// const request = await fetch(JUSTWATCH_GRAPH_URL, {
	// 	...fetchOptions,
	// 	signal: controller.signal,
	// 	body: JSON.stringify(getSuggestedTitlesQuery)
	// })
	// const response = await request.json()

	const response = await searchMovie(query)
	// console.log(response)
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
				locale: "en_US",
				releaseYear: result.node.content.originalReleaseYear
			}
		}
	)

	return searchResults
}

export default fetchData
