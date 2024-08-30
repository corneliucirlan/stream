// export const querySearch = (
// 	languageCode: string,
// 	countryCode: string,
// 	searchQuery: string
// ) =>
// 	`{\"operationName\":\"GetSuggestedTitles\",\"variables\":{\"country\":\"${countryCode}\",\"language\":\"${languageCode}\",\"first\":18,\"filter\":{\"searchQuery\":\"${searchQuery}\"}},\"query\":\"query GetSuggestedTitles($country: Country!, $language: Language!, $first: Int!, $filter: TitleFilter) {\\n  popularTitles(country: $country, first: $first, filter: $filter) {\\n    edges {\\n      node {\\n        ...SuggestedTitle\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment SuggestedTitle on MovieOrShow {\\n  id\\n  objectType\\n  objectId\\n  content(country: $country, language: $language) {\\n    fullPath\\n    title\\n    originalReleaseYear\\n    posterUrl\\n    fullPath\\n    __typename\\n  }\\n  __typename\\n}\\n\"}`

export const querySearch = (
	languageCode: string,
	countryCode: string,
	searchQuery: string
) =>
	JSON.stringify({
		operationName: "GetSuggestedTitles",
		variables: {
			country: countryCode,
			language: languageCode,
			first: 18,
			filter: {
				searchQuery: searchQuery
			}
		},
		query: `query GetSuggestedTitles(
  $country: Country!
  $language: Language!
  $first: Int!
  $filter: TitleFilter
) {
  popularTitles(country: $country, first: $first, filter: $filter) {
    edges {
      node {
        ...SuggestedTitle
      }
    }
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
  }
}
`
	})

export default querySearch
