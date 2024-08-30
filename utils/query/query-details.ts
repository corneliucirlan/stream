const queryTitleDetails = (
	fullPath: string,
	languageCode: string,
	countryCode: string
) =>
	JSON.stringify({
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
          }
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
          }
          fullPath
          genres {
            shortName
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
            }
          }
          ... on MovieOrShowContent {
            originalTitle
            ageCertification
            credits {
              role
              name
              characterName
              personId
            }
            productionCountries
          }
          ... on SeasonContent {
            seasonNumber
          }
        }
        popularityRank(country: $country) {
          rank
          trend
          trendDifference
        }
      }
      ... on MovieOrShow {
        watchlistEntry {
          createdAt
        }
        likelistEntry {
          createdAt
        }
        dislikelistEntry {
          createdAt
        }
        customlistEntries {
          createdAt
          genericTitleList {
            id
          }
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
            }
          }
        }
      }
      ... on Movie {
        permanentAudiences
        seenlistEntry {
          createdAt
        }
      }
      ... on Show {
        permanentAudiences
        totalSeasonCount
        seenState(country: $country) {
          progress
          seenEpisodeCount
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
            }
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
              }
            }
            isReleased
            originalReleaseYear
          }
          show {
            id
            objectId
            objectType
            watchlistEntry {
              createdAt
            }
            content(country: $country, language: $language) {
              title
            }
          }
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
            }
          }
          seenlistEntry {
            createdAt
          }
        }
      }
      ... on Season {
        totalEpisodeCount
        episodes(limit: $episodeMaxLimit) {
          id
          objectType
          objectId
          seenlistEntry {
            createdAt
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
              }
            }
          }
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
            }
          }
          fallBackClips: content(country: "US", language: "en") {
            videobusterClips: clips(providers: [VIDEOBUSTER]) {
              ...TrailerClips
            }
            dailymotionClips: clips(providers: [DAILYMOTION]) {
              ...TrailerClips
            }
          }
          content(country: $country, language: $language) {
            title
            ageCertification
            fullPath
            genres {
              shortName
            }
            credits {
              role
              name
              characterName
              personId
            }
            productionCountries
            externalIds {
              imdbId
            }
            upcomingReleases(releaseTypes: DIGITAL) {
              releaseDate
            }
            backdrops {
              backdropUrl
            }
            posterUrl
            isReleased
            videobusterClips: clips(providers: [VIDEOBUSTER]) {
              ...TrailerClips
            }
            dailymotionClips: clips(providers: [DAILYMOTION]) {
              ...TrailerClips
            }
          }
          seenState(country: $country) {
            progress
          }
          watchlistEntry {
            createdAt
          }
          dislikelistEntry {
            createdAt
          }
          likelistEntry {
            createdAt
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
              }
            }
          }
        }
        seenState(country: $country) {
          progress
        }
      }
    }
  }
}

fragment TrailerClips on Clip {
  sourceUrl
  externalId
  provider
  name
}
`
	})

export default queryTitleDetails

// const queryTitleDetails = (
// 	fullPath: string,
// 	languageCode: string,
// 	countryCode: string
// ) =>
// 	JSON.stringify({
// 		operationName: "GetUrlTitleDetails",
// 		variables: {
// 			platform: "WEB",
// 			fullPath: fullPath,
// 			language: languageCode,
// 			country: countryCode,
// 			allowSponsoredRecommendations: {
// 				country: "US",
// 				platform: "WEB",
// 				pageType: "VIEW_TITLE_DETAIL",
// 				language: "en"
// 			}
// 		},
// 		query: `query GetUrlTitleDetails($fullPath: String!, $country: Country!, $language: Language!, $episodeMaxLimit: Int, $platform: Platform! = WEB, $allowSponsoredRecommendations: SponsoredRecommendationsInput) {
//   urlV2(fullPath: $fullPath) {
//     id
//     metaDescription
//     metaKeywords
//     metaRobots
//     metaTitle
//     heading1
//     heading2
//     htmlContent
//     node {
//       id
//       __typename
//       ... on MovieOrShowOrSeason {
//         objectType
//         objectId
//         offerCount(country: $country, platform: $platform)
//         offers(country: $country, platform: $platform) {
//           monetizationType
//           elementCount
//           package {
//             id
//             packageId
//             clearName
//             __typename
//           }
//           __typename
//         }
//         watchNowOffer(country: $country, platform: $platform) {
//           id
//           standardWebURL
//           __typename
//         }
//         promotedBundles(country: $country, platform: $platform) {
//           promotionUrl
//           __typename
//         }
//         availableTo(country: $country, platform: $platform) {
//           availableCountDown(country: $country)
//           availableToDate
//           package {
//             id
//             shortName
//             __typename
//           }
//           __typename
//         }
//         fallBackClips: content(country: "US", language: "en") {
//           videobusterClips: clips(providers: [VIDEOBUSTER]) {
//             ...TrailerClips
//             __typename
//           }
//           dailymotionClips: clips(providers: [DAILYMOTION]) {
//             ...TrailerClips
//             __typename
//           }
//           __typename
//         }
//         content(country: $country, language: $language) {
//           backdrops {
//             backdropUrl
//             __typename
//           }
//           fullBackdrops: backdrops(profile: S1920, format: JPG) {
//             backdropUrl
//             __typename
//           }
//           clips {
//             ...TrailerClips
//             __typename
//           }
//           videobusterClips: clips(providers: [VIDEOBUSTER]) {
//             ...TrailerClips
//             __typename
//           }
//           dailymotionClips: clips(providers: [DAILYMOTION]) {
//             ...TrailerClips
//             __typename
//           }
//           externalIds {
//             imdbId
//             __typename
//           }
//           fullPath
//           genres {
//             shortName
//             __typename
//           }
//           posterUrl
//           fullPosterUrl: posterUrl(profile: S718, format: JPG)
//           runtime
//           isReleased
//           scoring {
//             imdbScore
//             imdbVotes
//             tmdbPopularity
//             tmdbScore
//             __typename
//           }
//           shortDescription
//           title
//           originalReleaseYear
//           originalReleaseDate
//           upcomingReleases(releaseTypes: DIGITAL) {
//             releaseCountDown(country: $country)
//             releaseDate
//             label
//             package {
//               id
//               packageId
//               shortName
//               clearName
//               __typename
//             }
//             __typename
//           }
//           ... on MovieOrShowContent {
//             originalTitle
//             ageCertification
//             credits {
//               role
//               name
//               characterName
//               personId
//               __typename
//             }
//             productionCountries
//             __typename
//           }
//           ... on SeasonContent {
//             seasonNumber
//             __typename
//           }
//           __typename
//         }
//         popularityRank(country: $country) {
//           rank
//           trend
//           trendDifference
//           __typename
//         }
//         __typename
//       }
//       ... on MovieOrShow {
//         watchlistEntry {
//           createdAt
//           __typename
//         }
//         likelistEntry {
//           createdAt
//           __typename
//         }
//         dislikelistEntry {
//           createdAt
//           __typename
//         }
//         customlistEntries {
//           createdAt
//           genericTitleList {
//             id
//             __typename
//           }
//           __typename
//         }
//         similarTitlesV2(
//           country: $country
//           allowSponsoredRecommendations: $allowSponsoredRecommendations
//         ) {
//           sponsoredAd {
//             bidId
//             holdoutGroup
//             campaign {
//               hideRatings
//               __typename
//             }
//             __typename
//           }
//           __typename
//         }
//         __typename
//       }
//       ... on Movie {
//         permanentAudiences
//         seenlistEntry {
//           createdAt
//           __typename
//         }
//         __typename
//       }
//       ... on Show {
//         permanentAudiences
//         totalSeasonCount
//         seenState(country: $country) {
//           progress
//           seenEpisodeCount
//           __typename
//         }
//         seasons(sortDirection: DESC) {
//           id
//           objectId
//           objectType
//           totalEpisodeCount
//           availableTo(country: $country, platform: $platform) {
//             availableToDate
//             availableCountDown(country: $country)
//             package {
//               id
//               shortName
//               __typename
//             }
//             __typename
//           }
//           content(country: $country, language: $language) {
//             posterUrl
//             seasonNumber
//             fullPath
//             title
//             upcomingReleases(releaseTypes: DIGITAL) {
//               releaseDate
//               releaseCountDown(country: $country)
//               package {
//                 id
//                 shortName
//                 __typename
//               }
//               __typename
//             }
//             isReleased
//             originalReleaseYear
//             __typename
//           }
//           show {
//             id
//             objectId
//             objectType
//             watchlistEntry {
//               createdAt
//               __typename
//             }
//             content(country: $country, language: $language) {
//               title
//               __typename
//             }
//             __typename
//           }
//           __typename
//         }
//         recentEpisodes: episodes(
//           sortDirection: DESC
//           limit: 3
//           releasedInCountry: $country
//         ) {
//           id
//           objectId
//           content(country: $country, language: $language) {
//             title
//             shortDescription
//             episodeNumber
//             seasonNumber
//             isReleased
//             upcomingReleases {
//               releaseDate
//               label
//               __typename
//             }
//             __typename
//           }
//           seenlistEntry {
//             createdAt
//             __typename
//           }
//           __typename
//         }
//         __typename
//       }
//       ... on Season {
//         totalEpisodeCount
//         episodes(limit: $episodeMaxLimit) {
//           id
//           objectType
//           objectId
//           seenlistEntry {
//             createdAt
//             __typename
//           }
//           content(country: $country, language: $language) {
//             title
//             shortDescription
//             episodeNumber
//             seasonNumber
//             isReleased
//             upcomingReleases(releaseTypes: DIGITAL) {
//               releaseDate
//               label
//               package {
//                 id
//                 packageId
//                 __typename
//               }
//               __typename
//             }
//             __typename
//           }
//           __typename
//         }
//         show {
//           id
//           objectId
//           objectType
//           totalSeasonCount
//           customlistEntries {
//             createdAt
//             genericTitleList {
//               id
//               __typename
//             }
//             __typename
//           }
//           fallBackClips: content(country: "US", language: "en") {
//             videobusterClips: clips(providers: [VIDEOBUSTER]) {
//               ...TrailerClips
//               __typename
//             }
//             dailymotionClips: clips(providers: [DAILYMOTION]) {
//               ...TrailerClips
//               __typename
//             }
//             __typename
//           }
//           content(country: $country, language: $language) {
//             title
//             ageCertification
//             fullPath
//             genres {
//               shortName
//               __typename
//             }
//             credits {
//               role
//               name
//               characterName
//               personId
//               __typename
//             }
//             productionCountries
//             externalIds {
//               imdbId
//               __typename
//             }
//             upcomingReleases(releaseTypes: DIGITAL) {
//               releaseDate
//               __typename
//             }
//             backdrops {
//               backdropUrl
//               __typename
//             }
//             posterUrl
//             isReleased
//             videobusterClips: clips(providers: [VIDEOBUSTER]) {
//               ...TrailerClips
//               __typename
//             }
//             dailymotionClips: clips(providers: [DAILYMOTION]) {
//               ...TrailerClips
//               __typename
//             }
//             __typename
//           }
//           seenState(country: $country) {
//             progress
//             __typename
//           }
//           watchlistEntry {
//             createdAt
//             __typename
//           }
//           dislikelistEntry {
//             createdAt
//             __typename
//           }
//           likelistEntry {
//             createdAt
//             __typename
//           }
//           similarTitlesV2(
//             country: $country
//             allowSponsoredRecommendations: $allowSponsoredRecommendations
//           ) {
//             sponsoredAd {
//               bidId
//               holdoutGroup
//               campaign {
//                 hideRatings
//                 __typename
//               }
//               __typename
//             }
//             __typename
//           }
//           __typename
//         }
//         seenState(country: $country) {
//           progress
//           __typename
//         }
//         __typename
//       }
//     }
//     __typename
//   }
// }

// fragment TrailerClips on Clip {
//   sourceUrl
//   externalId
//   provider
//   name
//   __typename
// }
// `
// 	})
