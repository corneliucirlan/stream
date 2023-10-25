import {
	fetchOptions,
	JUSTWATCH_GRAPH_URL,
	JUSTWATCH_IMAGE_URL
} from "@/utils/fetch/fetch-globals"
import { SearchResult } from "@/utils/types"
import { getPhotoID } from "@/utils/photo"

const searchQueryWorking = async (query: string) => {
	const response = await fetch(JUSTWATCH_GRAPH_URL, {
		headers: {
			// accept: "*/*",
			// "accept-language": "en-US,en;q=0.9",
			// "app-version": "3.8.0-web",
			"content-type": "application/json"
			// "device-id": "CTG1rGqnEe6nuQpYULAhOw",
			// "sec-ch-ua":
			// 	'"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
			// "sec-ch-ua-mobile": "?0",
			// "sec-ch-ua-platform": '"Windows"',
			// "sec-fetch-dest": "empty",
			// "sec-fetch-mode": "cors",
			// "sec-fetch-site": "same-site"
		},
		// referrer: "https://www.justwatch.com/",
		// referrerPolicy: "strict-origin-when-cross-origin",
		body: `{"operationName":"GetSuggestedTitles","variables":{"country":"US","language":"en","first":1,"filter":{"searchQuery":"${query}"}},"query":"query GetSuggestedTitles($country: Country!, $language: Language!, $first: Int!, $filter: TitleFilter) {\\n  popularTitles(country: $country, first: $first, filter: $filter) {\\n    edges {\\n      node {\\n        ...SuggestedTitle\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment SuggestedTitle on MovieOrShow {\\n  id\\n  objectType\\n  objectId\\n  content(country: $country, language: $language) {\\n    fullPath\\n    title\\n    originalReleaseYear\\n    posterUrl\\n    fullPath\\n    __typename\\n  }\\n  __typename\\n}\\n"}`,
		method: "POST",
		mode: "cors",
		credentials: "omit"
	})

	const result = await response.json()
	const titles: any = result.data.popularTitles.edges

	titles.map((title: any) => console.log("TITLE: ", title))
}

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

	const request = await fetch(JUSTWATCH_GRAPH_URL, {
		...fetchOptions,
		signal: controller.signal,
		body: JSON.stringify(getSuggestedTitlesQuery)
	})

	const response = await request.json()

	const searchResults = response.data.popularTitles.edges.map(
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
