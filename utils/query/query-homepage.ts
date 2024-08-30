// '{"operationName":"GetPopularTitles","variables":{"first":1,"platform":"WEB","popularTitlesSortBy":"POPULAR","sortRandomSeed":0,"creditsRole":"DIRECTOR","popularAfterCursor":"","popularTitlesFilter":{"ageCertifications":[],"excludeGenres":[],"excludeProductionCountries":[],"genres":[],"objectTypes":[],"productionCountries":[],"packages":[],"excludeIrrelevantTitles":false,"presentationTypes":[],"monetizationTypes":[],"searchQuery":""},"watchNowFilter":{"packages":[],"monetizationTypes":[]},"language":"en","country":"US","allowSponsoredRecommendations":{"country":"US","platform":"WEB","pageType":"VIEW_POPULAR","language":"en"}},"query":"query GetPopularTitles($allowSponsoredRecommendations: SponsoredRecommendationsInput, $backdropProfile: BackdropProfile, $country: Country!, $first: Int! = 70, $format: ImageFormat, $language: Language!, $platform: Platform! = WEB, $popularAfterCursor: String, $popularTitlesFilter: TitleFilter, $popularTitlesSortBy: PopularTitlesSorting! = POPULAR, $profile: PosterProfile, $sortRandomSeed: Int! = 0, $watchNowFilter: WatchNowOfferFilter!, $creditsRole: CreditRole! = DIRECTOR) {\\n  popularTitles(\\n    after: $popularAfterCursor\\n    allowSponsoredRecommendations: $allowSponsoredRecommendations\\n    country: $country\\n    filter: $popularTitlesFilter\\n    first: $first\\n    sortBy: $popularTitlesSortBy\\n    sortRandomSeed: $sortRandomSeed\\n  ) {\\n    edges {\\n      ...PopularTitleGraphql\\n      __typename\\n    }\\n    pageInfo {\\n      startCursor\\n      endCursor\\n      hasPreviousPage\\n      hasNextPage\\n      __typename\\n    }\\n    sponsoredAd {\\n      ...SponsoredAdFragment\\n      __typename\\n    }\\n    totalCount\\n    __typename\\n  }\\n}\\n\\nfragment PopularTitleGraphql on PopularTitlesEdge {\\n  cursor\\n  node {\\n    id\\n    objectId\\n    objectType\\n    content(country: $country, language: $language) {\\n      title\\n      fullPath\\n      scoring {\\n        imdbVotes\\n        imdbScore\\n        tmdbPopularity\\n        tmdbScore\\n        __typename\\n      }\\n      dailymotionClips: clips(providers: [DAILYMOTION]) {\\n        sourceUrl\\n        externalId\\n        provider\\n        __typename\\n      }\\n      posterUrl(profile: $profile, format: $format)\\n      ... on MovieOrShowOrSeasonContent {\\n        backdrops(profile: $backdropProfile, format: $format) {\\n          backdropUrl\\n          __typename\\n        }\\n        __typename\\n      }\\n      isReleased\\n      credits(role: $creditsRole) {\\n        name\\n        personId\\n        __typename\\n      }\\n      scoring {\\n        imdbVotes\\n        __typename\\n      }\\n      runtime\\n      genres {\\n        translation(language: $language)\\n        __typename\\n      }\\n      __typename\\n    }\\n    likelistEntry {\\n      createdAt\\n      __typename\\n    }\\n    dislikelistEntry {\\n      createdAt\\n      __typename\\n    }\\n    watchlistEntry {\\n      createdAt\\n      __typename\\n    }\\n    freeOffersCount: offerCount(\\n      country: $country\\n      platform: $platform\\n      filter: {monetizationTypes: [FREE]}\\n    )\\n    watchNowOffer(country: $country, platform: $platform, filter: $watchNowFilter) {\\n      id\\n      standardWebURL\\n      package {\\n        id\\n        packageId\\n        clearName\\n        __typename\\n      }\\n      retailPrice(language: $language)\\n      retailPriceValue\\n      lastChangeRetailPriceValue\\n      currency\\n      presentationType\\n      monetizationType\\n      availableTo\\n      __typename\\n    }\\n    ... on Movie {\\n      seenlistEntry {\\n        createdAt\\n        __typename\\n      }\\n      __typename\\n    }\\n    ... on Show {\\n      seenState(country: $country) {\\n        seenEpisodeCount\\n        progress\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment SponsoredAdFragment on SponsoredRecommendationAd {\\n  bidId\\n  holdoutGroup\\n  campaign {\\n    externalTrackers {\\n      type\\n      data\\n      __typename\\n    }\\n    hideRatings\\n    promotionalImageUrl\\n    watchNowLabel\\n    watchNowOffer {\\n      standardWebURL\\n      presentationType\\n      monetizationType\\n      package {\\n        id\\n        packageId\\n        shortName\\n        clearName\\n        icon\\n        __typename\\n      }\\n      __typename\\n    }\\n    node {\\n      id\\n      ... on MovieOrShow {\\n        content(country: $country, language: $language) {\\n          fullPath\\n          posterUrl\\n          title\\n          originalReleaseYear\\n          scoring {\\n            imdbScore\\n            __typename\\n          }\\n          externalIds {\\n            imdbId\\n            __typename\\n          }\\n          backdrops(format: $format, profile: $backdropProfile) {\\n            backdropUrl\\n            __typename\\n          }\\n          isReleased\\n          __typename\\n        }\\n        objectId\\n        objectType\\n        offers(country: $country, platform: $platform) {\\n          monetizationType\\n          presentationType\\n          package {\\n            id\\n            packageId\\n            __typename\\n          }\\n          id\\n          __typename\\n        }\\n        watchlistEntry {\\n          createdAt\\n          __typename\\n        }\\n        __typename\\n      }\\n      ... on Show {\\n        seenState(country: $country) {\\n          seenEpisodeCount\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n"}'

export default JSON.stringify({
	operationName: "GetPopularTitles",
	variables: {
		first: 1,
		platform: "WEB",
		popularTitlesSortBy: "POPULAR",
		sortRandomSeed: 0,
		creditsRole: "DIRECTOR",
		popularAfterCursor: "",
		popularTitlesFilter: {
			ageCertifications: [],
			excludeGenres: [],
			excludeProductionCountries: [],
			genres: [],
			objectTypes: [],
			productionCountries: [],
			packages: [],
			excludeIrrelevantTitles: false,
			presentationTypes: [],
			monetizationTypes: [],
			searchQuery: ""
		},
		language: "en",
		country: "US"
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
  $creditsRole: CreditRole! = DIRECTOR
) {
  popularTitles(
    after: $popularAfterCursor
    allowSponsoredRecommendations: $allowSponsoredRecommendations
    country: $country
    filter: $popularTitlesFilter
    first: $first
    sortBy: $popularTitlesSortBy
    sortRandomSeed: $sortRandomSeed
  ) {
    edges {
      ...PopularTitleGraphql
    }
  }
}

fragment PopularTitleGraphql on PopularTitlesEdge {
  node {
    content(country: $country, language: $language) {
      fullPath
      posterUrl(profile: $profile, format: $format)
      ... on MovieOrShowOrSeasonContent {
        backdrops(profile: $backdropProfile, format: $format) {
          backdropUrl
        }
      }
      credits(role: $creditsRole) {
        name
        personId
      }
    }
    freeOffersCount: offerCount(
      country: $country
      platform: $platform
      filter: { monetizationTypes: [FREE] }
    )
  }
}
`
})
