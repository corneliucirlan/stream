import { JUSTWATCH_GRAPH_URL, fetchOptions } from "@/utils/fetch/fetch-globals"
import { Details } from "@/utils/types"
import { getPhotoID } from "@/utils/photo"
import { getTitleDetails } from "@/utils/puppeteer"

const fetchTitleDetails = async (
	locale: string,
	fullPath: string
): Promise<Details> => {
	const [languageCode, countryCode] = locale.split("_")

	// body: '{"operationName":"GetUrlTitleDetails","variables":{"platform":"WEB","fullPath":"/us/tv-show/only-murders-in-the-building","language":"en","country":"US","episodeMaxLimit":20,"allowSponsoredRecommendations":{"country":"US","platform":"WEB","pageType":"VIEW_TITLE_DETAIL","language":"en"}},"query":"query GetUrlTitleDetails($fullPath: String!, $country: Country!, $language: Language!, $episodeMaxLimit: Int, $platform: Platform! = WEB, $allowSponsoredRecommendations: SponsoredRecommendationsInput) {\\n  urlV2(fullPath: $fullPath) {\\n    id\\n    metaDescription\\n    metaKeywords\\n    metaRobots\\n    metaTitle\\n    heading1\\n    heading2\\n    htmlContent\\n    node {\\n      id\\n      __typename\\n      ... on MovieOrShowOrSeason {\\n        plexPlayerOffers: offers(\\n          country: $country\\n          platform: $platform\\n          filter: {packages: [\\"pxp\\"]}\\n        ) {\\n          id\\n          standardWebURL\\n          package {\\n            id\\n            packageId\\n            clearName\\n            technicalName\\n            __typename\\n          }\\n          __typename\\n        }\\n        objectType\\n        objectId\\n        offerCount(country: $country, platform: $platform)\\n        offers(country: $country, platform: $platform) {\\n          monetizationType\\n          elementCount\\n          package {\\n            id\\n            packageId\\n            clearName\\n            __typename\\n          }\\n          __typename\\n        }\\n        watchNowOffer(country: $country, platform: $platform) {\\n          id\\n          standardWebURL\\n          __typename\\n        }\\n        promotedBundles(country: $country, platform: $platform) {\\n          promotionUrl\\n          __typename\\n        }\\n        availableTo(country: $country, platform: $platform) {\\n          availableCountDown(country: $country)\\n          availableToDate\\n          package {\\n            id\\n            shortName\\n            __typename\\n          }\\n          __typename\\n        }\\n        fallBackClips: content(country: \\"US\\", language: \\"en\\") {\\n          videobusterClips: clips(providers: [VIDEOBUSTER]) {\\n            ...TrailerClips\\n            __typename\\n          }\\n          dailymotionClips: clips(providers: [DAILYMOTION]) {\\n            ...TrailerClips\\n            __typename\\n          }\\n          __typename\\n        }\\n        content(country: $country, language: $language) {\\n          backdrops {\\n            backdropUrl\\n            __typename\\n          }\\n          fullBackdrops: backdrops(profile: S1920, format: JPG) {\\n            backdropUrl\\n            __typename\\n          }\\n          clips {\\n            ...TrailerClips\\n            __typename\\n          }\\n          videobusterClips: clips(providers: [VIDEOBUSTER]) {\\n            ...TrailerClips\\n            __typename\\n          }\\n          dailymotionClips: clips(providers: [DAILYMOTION]) {\\n            ...TrailerClips\\n            __typename\\n          }\\n          externalIds {\\n            imdbId\\n            __typename\\n          }\\n          fullPath\\n          genres {\\n            shortName\\n            __typename\\n          }\\n          posterUrl\\n          fullPosterUrl: posterUrl(profile: S718, format: JPG)\\n          runtime\\n          isReleased\\n          scoring {\\n            imdbScore\\n            imdbVotes\\n            tmdbPopularity\\n            tmdbScore\\n            __typename\\n          }\\n          shortDescription\\n          title\\n          originalReleaseYear\\n          originalReleaseDate\\n          upcomingReleases(releaseTypes: DIGITAL) {\\n            releaseCountDown(country: $country)\\n            releaseDate\\n            label\\n            package {\\n              id\\n              packageId\\n              shortName\\n              clearName\\n              __typename\\n            }\\n            __typename\\n          }\\n          ... on MovieOrShowContent {\\n            originalTitle\\n            ageCertification\\n            credits {\\n              role\\n              name\\n              characterName\\n              personId\\n              __typename\\n            }\\n            productionCountries\\n            __typename\\n          }\\n          ... on SeasonContent {\\n            seasonNumber\\n            __typename\\n          }\\n          __typename\\n        }\\n        popularityRank(country: $country) {\\n          rank\\n          trend\\n          trendDifference\\n          __typename\\n        }\\n        __typename\\n      }\\n      ... on MovieOrShow {\\n        watchlistEntry {\\n          createdAt\\n          __typename\\n        }\\n        likelistEntry {\\n          createdAt\\n          __typename\\n        }\\n        dislikelistEntry {\\n          createdAt\\n          __typename\\n        }\\n        customlistEntries {\\n          createdAt\\n          genericTitleList {\\n            id\\n            __typename\\n          }\\n          __typename\\n        }\\n        similarTitlesV2(\\n          country: $country\\n          allowSponsoredRecommendations: $allowSponsoredRecommendations\\n        ) {\\n          sponsoredAd {\\n            bidId\\n            holdoutGroup\\n            campaign {\\n              hideRatings\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      ... on Movie {\\n        permanentAudiences\\n        seenlistEntry {\\n          createdAt\\n          __typename\\n        }\\n        __typename\\n      }\\n      ... on Show {\\n        permanentAudiences\\n        totalSeasonCount\\n        seenState(country: $country) {\\n          progress\\n          seenEpisodeCount\\n          __typename\\n        }\\n        seasons(sortDirection: DESC) {\\n          id\\n          objectId\\n          objectType\\n          totalEpisodeCount\\n          availableTo(country: $country, platform: $platform) {\\n            availableToDate\\n            availableCountDown(country: $country)\\n            package {\\n              id\\n              shortName\\n              __typename\\n            }\\n            __typename\\n          }\\n          content(country: $country, language: $language) {\\n            posterUrl\\n            seasonNumber\\n            fullPath\\n            title\\n            upcomingReleases(releaseTypes: DIGITAL) {\\n              releaseDate\\n              releaseCountDown(country: $country)\\n              package {\\n                id\\n                shortName\\n                __typename\\n              }\\n              __typename\\n            }\\n            isReleased\\n            originalReleaseYear\\n            __typename\\n          }\\n          show {\\n            id\\n            objectId\\n            objectType\\n            watchlistEntry {\\n              createdAt\\n              __typename\\n            }\\n            content(country: $country, language: $language) {\\n              title\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        recentEpisodes: episodes(\\n          sortDirection: DESC\\n          limit: 3\\n          releasedInCountry: $country\\n        ) {\\n          id\\n          objectId\\n          content(country: $country, language: $language) {\\n            title\\n            shortDescription\\n            episodeNumber\\n            seasonNumber\\n            isReleased\\n            upcomingReleases {\\n              releaseDate\\n              label\\n              __typename\\n            }\\n            __typename\\n          }\\n          seenlistEntry {\\n            createdAt\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      ... on Season {\\n        totalEpisodeCount\\n        episodes(limit: $episodeMaxLimit) {\\n          id\\n          objectType\\n          objectId\\n          seenlistEntry {\\n            createdAt\\n            __typename\\n          }\\n          content(country: $country, language: $language) {\\n            title\\n            shortDescription\\n            episodeNumber\\n            seasonNumber\\n            isReleased\\n            upcomingReleases(releaseTypes: DIGITAL) {\\n              releaseDate\\n              label\\n              package {\\n                id\\n                packageId\\n                __typename\\n              }\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        show {\\n          id\\n          objectId\\n          objectType\\n          totalSeasonCount\\n          customlistEntries {\\n            createdAt\\n            genericTitleList {\\n              id\\n              __typename\\n            }\\n            __typename\\n          }\\n          fallBackClips: content(country: \\"US\\", language: \\"en\\") {\\n            videobusterClips: clips(providers: [VIDEOBUSTER]) {\\n              ...TrailerClips\\n              __typename\\n            }\\n            dailymotionClips: clips(providers: [DAILYMOTION]) {\\n              ...TrailerClips\\n              __typename\\n            }\\n            __typename\\n          }\\n          content(country: $country, language: $language) {\\n            title\\n            ageCertification\\n            fullPath\\n            genres {\\n              shortName\\n              __typename\\n            }\\n            credits {\\n              role\\n              name\\n              characterName\\n              personId\\n              __typename\\n            }\\n            productionCountries\\n            externalIds {\\n              imdbId\\n              __typename\\n            }\\n            upcomingReleases(releaseTypes: DIGITAL) {\\n              releaseDate\\n              __typename\\n            }\\n            backdrops {\\n              backdropUrl\\n              __typename\\n            }\\n            posterUrl\\n            isReleased\\n            videobusterClips: clips(providers: [VIDEOBUSTER]) {\\n              ...TrailerClips\\n              __typename\\n            }\\n            dailymotionClips: clips(providers: [DAILYMOTION]) {\\n              ...TrailerClips\\n              __typename\\n            }\\n            __typename\\n          }\\n          seenState(country: $country) {\\n            progress\\n            __typename\\n          }\\n          watchlistEntry {\\n            createdAt\\n            __typename\\n          }\\n          dislikelistEntry {\\n            createdAt\\n            __typename\\n          }\\n          likelistEntry {\\n            createdAt\\n            __typename\\n          }\\n          similarTitlesV2(\\n            country: $country\\n            allowSponsoredRecommendations: $allowSponsoredRecommendations\\n          ) {\\n            sponsoredAd {\\n              bidId\\n              holdoutGroup\\n              campaign {\\n                hideRatings\\n                __typename\\n              }\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        seenState(country: $country) {\\n          progress\\n          __typename\\n        }\\n        __typename\\n      }\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment TrailerClips on Clip {\\n  sourceUrl\\n  externalId\\n  provider\\n  name\\n  __typename\\n}\\n"}',

	// const request = await fetch(JUSTWATCH_GRAPH_URL, {
	// 	...fetchOptions,
	// 	body:
	// 		'{"operationName":"GetUrlTitleDetails","variables":{"platform":"WEB","fullPath":"' +
	// 		fullPath +
	// 		'","language":"' +
	// 		languageCode +
	// 		'","country":"' +
	// 		countryCode +
	// 		'","allowSponsoredRecommendations":{"country":"US","platform":"WEB","pageType":"VIEW_TITLE_DETAIL","language":"en"}},"query":"query GetUrlTitleDetails($fullPath: String!, $country: Country!, $language: Language!, $episodeMaxLimit: Int, $platform: Platform! = WEB, $allowSponsoredRecommendations: SponsoredRecommendationsInput) {\\n  urlV2(fullPath: $fullPath) {\\n    id\\n    metaDescription\\n    metaKeywords\\n    metaRobots\\n    metaTitle\\n    heading1\\n    heading2\\n    htmlContent\\n    node {\\n      id\\n      __typename\\n      ... on MovieOrShowOrSeason {\\n        plexPlayerOffers: offers(\\n          country: $country\\n          platform: $platform\\n          filter: {packages: [\\"pxp\\"]}\\n        ) {\\n          id\\n          standardWebURL\\n          package {\\n            id\\n            packageId\\n            clearName\\n            technicalName\\n            __typename\\n          }\\n          __typename\\n        }\\n        objectType\\n        objectId\\n        offerCount(country: $country, platform: $platform)\\n        offers(country: $country, platform: $platform) {\\n          monetizationType\\n          elementCount\\n          package {\\n            id\\n            packageId\\n            clearName\\n            __typename\\n          }\\n          __typename\\n        }\\n        watchNowOffer(country: $country, platform: $platform) {\\n          id\\n          standardWebURL\\n          __typename\\n        }\\n        promotedBundles(country: $country, platform: $platform) {\\n          promotionUrl\\n          __typename\\n        }\\n        availableTo(country: $country, platform: $platform) {\\n          availableCountDown(country: $country)\\n          availableToDate\\n          package {\\n            id\\n            shortName\\n            __typename\\n          }\\n          __typename\\n        }\\n        fallBackClips: content(country: \\"US\\", language: \\"en\\") {\\n          videobusterClips: clips(providers: [VIDEOBUSTER]) {\\n            ...TrailerClips\\n            __typename\\n          }\\n          dailymotionClips: clips(providers: [DAILYMOTION]) {\\n            ...TrailerClips\\n            __typename\\n          }\\n          __typename\\n        }\\n        content(country: $country, language: $language) {\\n          backdrops {\\n            backdropUrl\\n            __typename\\n          }\\n          fullBackdrops: backdrops(profile: S1920, format: JPG) {\\n            backdropUrl\\n            __typename\\n          }\\n          clips {\\n            ...TrailerClips\\n            __typename\\n          }\\n          videobusterClips: clips(providers: [VIDEOBUSTER]) {\\n            ...TrailerClips\\n            __typename\\n          }\\n          dailymotionClips: clips(providers: [DAILYMOTION]) {\\n            ...TrailerClips\\n            __typename\\n          }\\n          externalIds {\\n            imdbId\\n            __typename\\n          }\\n          fullPath\\n          genres {\\n            shortName\\n            __typename\\n          }\\n          posterUrl\\n          fullPosterUrl: posterUrl(profile: S718, format: JPG)\\n          runtime\\n          isReleased\\n          scoring {\\n            imdbScore\\n            imdbVotes\\n            tmdbPopularity\\n            tmdbScore\\n            __typename\\n          }\\n          shortDescription\\n          title\\n          originalReleaseYear\\n          originalReleaseDate\\n          upcomingReleases(releaseTypes: DIGITAL) {\\n            releaseCountDown(country: $country)\\n            releaseDate\\n            label\\n            package {\\n              id\\n              packageId\\n              shortName\\n              clearName\\n              __typename\\n            }\\n            __typename\\n          }\\n          ... on MovieOrShowContent {\\n            originalTitle\\n            ageCertification\\n            credits {\\n              role\\n              name\\n              characterName\\n              personId\\n              __typename\\n            }\\n            productionCountries\\n            __typename\\n          }\\n          ... on SeasonContent {\\n            seasonNumber\\n            __typename\\n          }\\n          __typename\\n        }\\n        popularityRank(country: $country) {\\n          rank\\n          trend\\n          trendDifference\\n          __typename\\n        }\\n        __typename\\n      }\\n      ... on MovieOrShow {\\n        watchlistEntry {\\n          createdAt\\n          __typename\\n        }\\n        likelistEntry {\\n          createdAt\\n          __typename\\n        }\\n        dislikelistEntry {\\n          createdAt\\n          __typename\\n        }\\n        customlistEntries {\\n          createdAt\\n          genericTitleList {\\n            id\\n            __typename\\n          }\\n          __typename\\n        }\\n        similarTitlesV2(\\n          country: $country\\n          allowSponsoredRecommendations: $allowSponsoredRecommendations\\n        ) {\\n          sponsoredAd {\\n            bidId\\n            holdoutGroup\\n            campaign {\\n              hideRatings\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      ... on Movie {\\n        permanentAudiences\\n        seenlistEntry {\\n          createdAt\\n          __typename\\n        }\\n        __typename\\n      }\\n      ... on Show {\\n        permanentAudiences\\n        totalSeasonCount\\n        seenState(country: $country) {\\n          progress\\n          seenEpisodeCount\\n          __typename\\n        }\\n        seasons(sortDirection: DESC) {\\n          id\\n          objectId\\n          objectType\\n          totalEpisodeCount\\n          availableTo(country: $country, platform: $platform) {\\n            availableToDate\\n            availableCountDown(country: $country)\\n            package {\\n              id\\n              shortName\\n              __typename\\n            }\\n            __typename\\n          }\\n          content(country: $country, language: $language) {\\n            posterUrl\\n            seasonNumber\\n            fullPath\\n            title\\n            upcomingReleases(releaseTypes: DIGITAL) {\\n              releaseDate\\n              releaseCountDown(country: $country)\\n              package {\\n                id\\n                shortName\\n                __typename\\n              }\\n              __typename\\n            }\\n            isReleased\\n            originalReleaseYear\\n            __typename\\n          }\\n          show {\\n            id\\n            objectId\\n            objectType\\n            watchlistEntry {\\n              createdAt\\n              __typename\\n            }\\n            content(country: $country, language: $language) {\\n              title\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        recentEpisodes: episodes(\\n          sortDirection: DESC\\n          limit: 3\\n          releasedInCountry: $country\\n        ) {\\n          id\\n          objectId\\n          content(country: $country, language: $language) {\\n            title\\n            shortDescription\\n            episodeNumber\\n            seasonNumber\\n            isReleased\\n            upcomingReleases {\\n              releaseDate\\n              label\\n              __typename\\n            }\\n            __typename\\n          }\\n          seenlistEntry {\\n            createdAt\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      ... on Season {\\n        totalEpisodeCount\\n        episodes(limit: $episodeMaxLimit) {\\n          id\\n          objectType\\n          objectId\\n          seenlistEntry {\\n            createdAt\\n            __typename\\n          }\\n          content(country: $country, language: $language) {\\n            title\\n            shortDescription\\n            episodeNumber\\n            seasonNumber\\n            isReleased\\n            upcomingReleases(releaseTypes: DIGITAL) {\\n              releaseDate\\n              label\\n              package {\\n                id\\n                packageId\\n                __typename\\n              }\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        show {\\n          id\\n          objectId\\n          objectType\\n          totalSeasonCount\\n          customlistEntries {\\n            createdAt\\n            genericTitleList {\\n              id\\n              __typename\\n            }\\n            __typename\\n          }\\n          fallBackClips: content(country: \\"US\\", language: \\"en\\") {\\n            videobusterClips: clips(providers: [VIDEOBUSTER]) {\\n              ...TrailerClips\\n              __typename\\n            }\\n            dailymotionClips: clips(providers: [DAILYMOTION]) {\\n              ...TrailerClips\\n              __typename\\n            }\\n            __typename\\n          }\\n          content(country: $country, language: $language) {\\n            title\\n            ageCertification\\n            fullPath\\n            genres {\\n              shortName\\n              __typename\\n            }\\n            credits {\\n              role\\n              name\\n              characterName\\n              personId\\n              __typename\\n            }\\n            productionCountries\\n            externalIds {\\n              imdbId\\n              __typename\\n            }\\n            upcomingReleases(releaseTypes: DIGITAL) {\\n              releaseDate\\n              __typename\\n            }\\n            backdrops {\\n              backdropUrl\\n              __typename\\n            }\\n            posterUrl\\n            isReleased\\n            videobusterClips: clips(providers: [VIDEOBUSTER]) {\\n              ...TrailerClips\\n              __typename\\n            }\\n            dailymotionClips: clips(providers: [DAILYMOTION]) {\\n              ...TrailerClips\\n              __typename\\n            }\\n            __typename\\n          }\\n          seenState(country: $country) {\\n            progress\\n            __typename\\n          }\\n          watchlistEntry {\\n            createdAt\\n            __typename\\n          }\\n          dislikelistEntry {\\n            createdAt\\n            __typename\\n          }\\n          likelistEntry {\\n            createdAt\\n            __typename\\n          }\\n          similarTitlesV2(\\n            country: $country\\n            allowSponsoredRecommendations: $allowSponsoredRecommendations\\n          ) {\\n            sponsoredAd {\\n              bidId\\n              holdoutGroup\\n              campaign {\\n                hideRatings\\n                __typename\\n              }\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        seenState(country: $country) {\\n          progress\\n          __typename\\n        }\\n        __typename\\n      }\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment TrailerClips on Clip {\\n  sourceUrl\\n  externalId\\n  provider\\n  name\\n  __typename\\n}\\n"}'
	// })

	const body = JSON.stringify({
		operationName: "GetUrlTitleDetails",
		variables: {
			platform: "WEB",
			fullPath: fullPath,
			language: languageCode,
			country: countryCode,
			allowSponsoredRecommendations: {
				country: "US",
				platform: "WEB",
				pageType: "VIEW_TITLE_DETAIL",
				language: "en"
			}
		},
		query: `query GetUrlTitleDetails($fullPath: String!, $country: Country!, $language: Language!, $episodeMaxLimit: Int, $platform: Platform! = WEB, $allowSponsoredRecommendations: SponsoredRecommendationsInput) {
  urlV2(fullPath: $fullPath) {
    id
    metaDescription
    metaKeywords
    metaRobots
    metaTitle
    heading1
    heading2
    htmlContent
    node {
      id
      __typename
      ... on MovieOrShowOrSeason {
        objectType
        objectId
        offerCount(country: $country, platform: $platform)
        offers(country: $country, platform: $platform) {
          monetizationType
          elementCount
          package {
            id
            packageId
            clearName
            __typename
          }
          __typename
        }
        watchNowOffer(country: $country, platform: $platform) {
          id
          standardWebURL
          __typename
        }
        promotedBundles(country: $country, platform: $platform) {
          promotionUrl
          __typename
        }
        availableTo(country: $country, platform: $platform) {
          availableCountDown(country: $country)
          availableToDate
          package {
            id
            shortName
            __typename
          }
          __typename
        }
        fallBackClips: content(country: "US", language: "en") {
          videobusterClips: clips(providers: [VIDEOBUSTER]) {
            ...TrailerClips
            __typename
          }
          dailymotionClips: clips(providers: [DAILYMOTION]) {
            ...TrailerClips
            __typename
          }
          __typename
        }
        content(country: $country, language: $language) {
          backdrops {
            backdropUrl
            __typename
          }
          fullBackdrops: backdrops(profile: S1920, format: JPG) {
            backdropUrl
            __typename
          }
          clips {
            ...TrailerClips
            __typename
          }
          videobusterClips: clips(providers: [VIDEOBUSTER]) {
            ...TrailerClips
            __typename
          }
          dailymotionClips: clips(providers: [DAILYMOTION]) {
            ...TrailerClips
            __typename
          }
          externalIds {
            imdbId
            __typename
          }
          fullPath
          genres {
            shortName
            __typename
          }
          posterUrl
          fullPosterUrl: posterUrl(profile: S718, format: JPG)
          runtime
          isReleased
          scoring {
            imdbScore
            imdbVotes
            tmdbPopularity
            tmdbScore
            __typename
          }
          shortDescription
          title
          originalReleaseYear
          originalReleaseDate
          upcomingReleases(releaseTypes: DIGITAL) {
            releaseCountDown(country: $country)
            releaseDate
            label
            package {
              id
              packageId
              shortName
              clearName
              __typename
            }
            __typename
          }
          ... on MovieOrShowContent {
            originalTitle
            ageCertification
            credits {
              role
              name
              characterName
              personId
              __typename
            }
            productionCountries
            __typename
          }
          ... on SeasonContent {
            seasonNumber
            __typename
          }
          __typename
        }
        popularityRank(country: $country) {
          rank
          trend
          trendDifference
          __typename
        }
        __typename
      }
      ... on MovieOrShow {
        watchlistEntry {
          createdAt
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
        customlistEntries {
          createdAt
          genericTitleList {
            id
            __typename
          }
          __typename
        }
        similarTitlesV2(
          country: $country
          allowSponsoredRecommendations: $allowSponsoredRecommendations
        ) {
          sponsoredAd {
            bidId
            holdoutGroup
            campaign {
              hideRatings
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      ... on Movie {
        permanentAudiences
        seenlistEntry {
          createdAt
          __typename
        }
        __typename
      }
      ... on Show {
        permanentAudiences
        totalSeasonCount
        seenState(country: $country) {
          progress
          seenEpisodeCount
          __typename
        }
        seasons(sortDirection: DESC) {
          id
          objectId
          objectType
          totalEpisodeCount
          availableTo(country: $country, platform: $platform) {
            availableToDate
            availableCountDown(country: $country)
            package {
              id
              shortName
              __typename
            }
            __typename
          }
          content(country: $country, language: $language) {
            posterUrl
            seasonNumber
            fullPath
            title
            upcomingReleases(releaseTypes: DIGITAL) {
              releaseDate
              releaseCountDown(country: $country)
              package {
                id
                shortName
                __typename
              }
              __typename
            }
            isReleased
            originalReleaseYear
            __typename
          }
          show {
            id
            objectId
            objectType
            watchlistEntry {
              createdAt
              __typename
            }
            content(country: $country, language: $language) {
              title
              __typename
            }
            __typename
          }
          __typename
        }
        recentEpisodes: episodes(
          sortDirection: DESC
          limit: 3
          releasedInCountry: $country
        ) {
          id
          objectId
          content(country: $country, language: $language) {
            title
            shortDescription
            episodeNumber
            seasonNumber
            isReleased
            upcomingReleases {
              releaseDate
              label
              __typename
            }
            __typename
          }
          seenlistEntry {
            createdAt
            __typename
          }
          __typename
        }
        __typename
      }
      ... on Season {
        totalEpisodeCount
        episodes(limit: $episodeMaxLimit) {
          id
          objectType
          objectId
          seenlistEntry {
            createdAt
            __typename
          }
          content(country: $country, language: $language) {
            title
            shortDescription
            episodeNumber
            seasonNumber
            isReleased
            upcomingReleases(releaseTypes: DIGITAL) {
              releaseDate
              label
              package {
                id
                packageId
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        show {
          id
          objectId
          objectType
          totalSeasonCount
          customlistEntries {
            createdAt
            genericTitleList {
              id
              __typename
            }
            __typename
          }
          fallBackClips: content(country: "US", language: "en") {
            videobusterClips: clips(providers: [VIDEOBUSTER]) {
              ...TrailerClips
              __typename
            }
            dailymotionClips: clips(providers: [DAILYMOTION]) {
              ...TrailerClips
              __typename
            }
            __typename
          }
          content(country: $country, language: $language) {
            title
            ageCertification
            fullPath
            genres {
              shortName
              __typename
            }
            credits {
              role
              name
              characterName
              personId
              __typename
            }
            productionCountries
            externalIds {
              imdbId
              __typename
            }
            upcomingReleases(releaseTypes: DIGITAL) {
              releaseDate
              __typename
            }
            backdrops {
              backdropUrl
              __typename
            }
            posterUrl
            isReleased
            videobusterClips: clips(providers: [VIDEOBUSTER]) {
              ...TrailerClips
              __typename
            }
            dailymotionClips: clips(providers: [DAILYMOTION]) {
              ...TrailerClips
              __typename
            }
            __typename
          }
          seenState(country: $country) {
            progress
            __typename
          }
          watchlistEntry {
            createdAt
            __typename
          }
          dislikelistEntry {
            createdAt
            __typename
          }
          likelistEntry {
            createdAt
            __typename
          }
          similarTitlesV2(
            country: $country
            allowSponsoredRecommendations: $allowSponsoredRecommendations
          ) {
            sponsoredAd {
              bidId
              holdoutGroup
              campaign {
                hideRatings
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        seenState(country: $country) {
          progress
          __typename
        }
        __typename
      }
    }
    __typename
  }
}

fragment TrailerClips on Clip {
  sourceUrl
  externalId
  provider
  name
  __typename
}
`
	})

	// const request = await fetch(JUSTWATCH_GRAPH_URL, {
	// 	...fetchOptions,
	// 	body: body
	// })
	// const response = await request.json()

	// const response = await getTitleDetails(body)
	const response = await getTitleDetails(body)

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
