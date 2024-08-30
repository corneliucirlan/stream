export const JUSTWATCH_BASE_URL = "https://apis.justwatch.com"
export const JUSTWATCH_GRAPH_URL = `${JUSTWATCH_BASE_URL}/graphql`
export const JUSTWATCH_IMAGE_URL = "https://images.justwatch.com"

export const HEADERS = {
	accept: "*/*",
	"X-Requested-With": "fetch",
	"content-type": "application/json"
	// "accept-language": "en-US,en;q=0.9",
	// "app-version": "3.8.0-web",
	// "device-id": "rsRIG2n_Ee6cUfrEg3aSzA",
	// "sec-ch-ua":
	// 	'"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
	// "sec-ch-ua-mobile": "?0",
	// "sec-ch-ua-platform": '"Windows"',
	// "sec-fetch-dest": "empty",
	// "sec-fetch-mode": "cors",
	// "sec-fetch-site": "same-site"
}

export const fetchOptions = {
	method: "POST",
	mode: "cors" as RequestMode,
	credentials: "omit" as RequestCredentials,
	// referrer: "https://www.justwatch.com/",
	// referrerPolicy: "strict-origin-when-cross-origin",
	headers: HEADERS
}

// export const bodyBackgroundImage =
// 	'{"operationName":"GetPopularTitles","variables":{"first":1,"platform":"WEB","popularTitlesSortBy":"POPULAR","sortRandomSeed":0,"popularAfterCursor":"","popularTitlesFilter":{"ageCertifications":[],"excludeGenres":[],"excludeProductionCountries":[],"genres":[],"objectTypes":[],"productionCountries":[],"packages":["nfx"],"excludeIrrelevantTitles":false,"presentationTypes":[],"monetizationTypes":[]},"watchNowFilter":{"packages":["nfx"],"monetizationTypes":[]},"language":"en","country":"US","allowSponsoredRecommendations":{"country":"US","platform":"WEB","pageType":"VIEW_POPULAR","language":"en"}},"query":"query GetPopularTitles($allowSponsoredRecommendations: SponsoredRecommendationsInput, $backdropProfile: BackdropProfile, $country: Country!, $first: Int! = 70, $format: ImageFormat, $language: Language!, $platform: Platform! = WEB, $popularAfterCursor: String, $popularTitlesFilter: TitleFilter, $popularTitlesSortBy: PopularTitlesSorting! = POPULAR, $profile: PosterProfile, $sortRandomSeed: Int! = 0, $watchNowFilter: WatchNowOfferFilter!) {\\n popularTitles(\\n after: $popularAfterCursor\\n allowSponsoredRecommendations: $allowSponsoredRecommendations\\n country: $country\\n filter: $popularTitlesFilter\\n first: $first\\n sortBy: $popularTitlesSortBy\\n sortRandomSeed: $sortRandomSeed\\n ) {\\n edges {\\n ...PopularTitleGraphql\\n __typename\\n }\\n pageInfo {\\n startCursor\\n endCursor\\n hasPreviousPage\\n hasNextPage\\n __typename\\n }\\n sponsoredAd {\\n ...SponsoredAdFragment\\n __typename\\n }\\n totalCount\\n __typename\\n }\\n}\\n\\nfragment PopularTitleGraphql on PopularTitlesEdge {\\n cursor\\n node {\\n id\\n objectId\\n objectType\\n content(country: $country, language: $language) {\\n title\\n fullPath\\n scoring {\\n imdbVotes\\n imdbScore\\n tmdbPopularity\\n tmdbScore\\n __typename\\n }\\n posterUrl(profile: $profile, format: $format)\\n ... on ShowContent {\\n backdrops(profile: $backdropProfile, format: $format) {\\n backdropUrl\\n __typename\\n }\\n __typename\\n }\\n isReleased\\n credits(role: DIRECTOR) {\\n name\\n __typename\\n }\\n scoring {\\n imdbVotes\\n __typename\\n }\\n runtime\\n genres {\\n translation(language: $language)\\n __typename\\n }\\n __typename\\n }\\n likelistEntry {\\n createdAt\\n __typename\\n }\\n dislikelistEntry {\\n createdAt\\n __typename\\n }\\n watchlistEntry {\\n createdAt\\n __typename\\n }\\n freeOffersCount: offerCount(\\n country: $country\\n platform: $platform\\n filter: {monetizationTypes: [FREE]}\\n )\\n watchNowOffer(country: $country, platform: $platform, filter: $watchNowFilter) {\\n id\\n standardWebURL\\n package {\\n id\\n packageId\\n clearName\\n __typename\\n }\\n retailPrice(language: $language)\\n retailPriceValue\\n lastChangeRetailPriceValue\\n currency\\n presentationType\\n monetizationType\\n availableTo\\n __typename\\n }\\n ... on Movie {\\n seenlistEntry {\\n createdAt\\n __typename\\n }\\n __typename\\n }\\n ... on Show {\\n seenState(country: $country) {\\n seenEpisodeCount\\n progress\\n __typename\\n }\\n __typename\\n }\\n __typename\\n }\\n __typename\\n}\\n\\nfragment SponsoredAdFragment on SponsoredRecommendationAd {\\n bidId\\n holdoutGroup\\n campaign {\\n externalTrackers {\\n type\\n data\\n __typename\\n }\\n hideRatings\\n promotionalImageUrl\\n watchNowLabel\\n watchNowOffer {\\n standardWebURL\\n presentationType\\n monetizationType\\n package {\\n id\\n packageId\\n shortName\\n clearName\\n icon\\n __typename\\n }\\n __typename\\n }\\n node {\\n id\\n ... on MovieOrShow {\\n content(country: $country, language: $language) {\\n fullPath\\n posterUrl\\n title\\n originalReleaseYear\\n scoring {\\n imdbScore\\n __typename\\n }\\n externalIds {\\n imdbId\\n __typename\\n }\\n backdrops(format: $format, profile: $backdropProfile) {\\n backdropUrl\\n __typename\\n }\\n isReleased\\n __typename\\n }\\n objectId\\n objectType\\n offers(country: $country, platform: $platform) {\\n monetizationType\\n presentationType\\n package {\\n id\\n packageId\\n __typename\\n }\\n id\\n __typename\\n }\\n watchlistEntry {\\n createdAt\\n __typename\\n }\\n __typename\\n }\\n ... on Show {\\n seenState(country: $country) {\\n seenEpisodeCount\\n __typename\\n }\\n __typename\\n }\\n __typename\\n }\\n __typename\\n }\\n __typename\\n}\\n"}'
export const bodyBackgroundImage = JSON.stringify({
	operationName: "GetPopularTitles",
	variables: {
		first: 1,
		platform: "WEB",
		popularTitlesSortBy: "POPULAR",
		sortRandomSeed: 0,
		popularAfterCursor: "",
		popularTitlesFilter: {
			ageCertifications: [],
			excludeGenres: [],
			excludeProductionCountries: [],
			genres: [],
			objectTypes: [],
			productionCountries: [],
			packages: ["nfx"],
			excludeIrrelevantTitles: false,
			presentationTypes: [],
			monetizationTypes: []
		},
		watchNowFilter: { packages: ["nfx"], monetizationTypes: [] },
		language: "en",
		country: "US",
		allowSponsoredRecommendations: {
			country: "US",
			platform: "WEB",
			pageType: "VIEW_POPULAR",
			language: "en"
		}
	},
	query: `
query GetPopularTitles(
  $allowSponsoredRecommendations: SponsoredRecommendationsInput,
  $backdropProfile: BackdropProfile,
  $country: Country!,
  $first: Int! = 70,
  $format: ImageFormat,
  $language: Language!,
  $platform: Platform! = WEB,
  $popularAfterCursor: String,
  $popularTitlesFilter: TitleFilter,
  $popularTitlesSortBy: PopularTitlesSorting! = POPULAR,
  $profile: PosterProfile,
  $sortRandomSeed: Int! = 0,
  $watchNowFilter: WatchNowOfferFilter!
) {
  popularTitles(
    after: $popularAfterCursor,
    allowSponsoredRecommendations: $allowSponsoredRecommendations,
    country: $country,
    filter: $popularTitlesFilter,
    first: $first,
    sortBy: $popularTitlesSortBy,
    sortRandomSeed: $sortRandomSeed
  ) {
    edges {
      ...PopularTitleGraphql
      __typename
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
      __typename
    }
    sponsoredAd {
      ...SponsoredAdFragment
      __typename
    }
    totalCount
    __typename
  }
}

fragment PopularTitleGraphql on PopularTitlesEdge {
  cursor
  node {
    id
    objectId
    objectType
    content(country: $country, language: $language) {
      title
      fullPath
      scoring {
        imdbVotes
        imdbScore
        tmdbPopularity
        tmdbScore
        __typename
      }
      posterUrl(profile: $profile, format: $format)
      ... on ShowContent {
        backdrops(profile: $backdropProfile, format: $format) {
          backdropUrl
          __typename
        }
        __typename
      }
      isReleased
      credits(role: DIRECTOR) {
        name
        __typename
      }
      scoring {
        imdbVotes
        __typename
      }
      runtime
      genres {
        translation(language: $language)
        __typename
      }
      __typename
    }
    likelistEntry {
      createdAt
      __typename
    }
    dislikelistEntry {
      createdAt
      __typename
    }
    watchlistEntry {
      createdAt
      __typename
    }
    freeOffersCount: offerCount(
      country: $country,
      platform: $platform,
      filter: { monetizationTypes: [FREE] }
    )
    watchNowOffer(country: $country, platform: $platform, filter: $watchNowFilter) {
      id
      standardWebURL
      package {
        id
        packageId
        clearName
        __typename
      }
      retailPrice(language: $language)
      retailPriceValue
      lastChangeRetailPriceValue
      currency
      presentationType
      monetizationType
      availableTo
      __typename
    }
    ... on Movie {
      seenlistEntry {
        createdAt
        __typename
      }
      __typename
    }
    ... on Show {
      seenState(country: $country) {
        seenEpisodeCount
        progress
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment SponsoredAdFragment on SponsoredRecommendationAd {
  bidId
  holdoutGroup
  campaign {
    externalTrackers {
      type
      data
      __typename
    }
    hideRatings
    promotionalImageUrl
    watchNowLabel
    watchNowOffer {
      standardWebURL
      presentationType
      monetizationType
      package {
        id
        packageId
        shortName
        clearName
        icon
        __typename
      }
      __typename
    }
    node {
      id
      ... on MovieOrShow {
        content(country: $country, language: $language) {
          fullPath
          posterUrl
          title
          originalReleaseYear
          scoring {
            imdbScore
            __typename
          }
          externalIds {
            imdbId
            __typename
          }
          backdrops(format: $format, profile: $backdropProfile) {
            backdropUrl
            __typename
          }
          isReleased
          __typename
        }
        objectId
        objectType
        offers(country: $country, platform: $platform) {
          monetizationType
          presentationType
          package {
            id
            packageId
            __typename
          }
          id
          __typename
        }
        watchlistEntry {
          createdAt
          __typename
        }
        __typename
      }
      ... on Show {
        seenState(country: $country) {
          seenEpisodeCount
          __typename
        }
        __typename
      }
      __typename
    }`
})
