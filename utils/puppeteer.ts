"use server"

import puppeteer from "puppeteer"
import countries from "./countries"

const url = "https://developer.chrome.com"

const launchBrowser = async () => {
	return await puppeteer.launch({
		headless: "new",
		args: [
			"--disable-web-security" // Disable web security (CORS bypass)
		]
	})
}

const openPage = async (browser: any, url: string) => {
	const page = await browser.newPage()
	await page.setBypassCSP(true)
	await page.goto(url)
	await page.setViewport({ width: 1080, height: 1024 })
	return page
}

const fetchDataFromAPI = async (page: any, requestBody: string) => {
	const response = await page.evaluate(async (requestBody: string) => {
		let response = await fetch("https://apis.justwatch.com/graphql", {
			credentials: "omit",
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0",
				Accept: "*/*",
				"Accept-Language": "en-US,en;q=0.5",
				"content-type": "application/json",
				"App-Version": "3.8.0-web-web",
				"DEVICE-ID": "XFpiKlykEe6wTkKWjpYncw",
				"Sec-Fetch-Dest": "empty",
				"Sec-Fetch-Mode": "cors",
				"Sec-Fetch-Site": "same-site"
			},
			referrer: "https://www.justwatch.com/",
			body: requestBody,
			method: "POST",
			mode: "cors"
		})

		let result = await response.json()
		return result
	}, requestBody)

	return response
}

const initBrowser = async (requestBody: string) => {
	// Init browser
	const browser = await launchBrowser()

	// Open page
	const page = await openPage(browser, url)

	// Fetch data
	const response = await fetchDataFromAPI(page, requestBody)

	// Close browser
	await browser.close()

	// Return fetched data
	return response
}

export const getBackgroundImage = async () => {
	// Create request body
	const requestBody =
		'{"operationName":"GetPopularTitles","variables":{"first":1,"platform":"WEB","popularTitlesSortBy":"POPULAR","sortRandomSeed":0,"popularAfterCursor":"","popularTitlesFilter":{"ageCertifications":[],"excludeGenres":[],"excludeProductionCountries":[],"genres":[],"objectTypes":[],"productionCountries":[],"packages":["nfx"],"excludeIrrelevantTitles":false,"presentationTypes":[],"monetizationTypes":[]},"watchNowFilter":{"packages":["nfx"],"monetizationTypes":[]},"language":"en","country":"US","allowSponsoredRecommendations":{"country":"US","platform":"WEB","pageType":"VIEW_POPULAR","language":"en"}},"query":"query GetPopularTitles($allowSponsoredRecommendations: SponsoredRecommendationsInput, $backdropProfile: BackdropProfile, $country: Country!, $first: Int! = 70, $format: ImageFormat, $language: Language!, $platform: Platform! = WEB, $popularAfterCursor: String, $popularTitlesFilter: TitleFilter, $popularTitlesSortBy: PopularTitlesSorting! = POPULAR, $profile: PosterProfile, $sortRandomSeed: Int! = 0, $watchNowFilter: WatchNowOfferFilter!) {\\n popularTitles(\\n after: $popularAfterCursor\\n allowSponsoredRecommendations: $allowSponsoredRecommendations\\n country: $country\\n filter: $popularTitlesFilter\\n first: $first\\n sortBy: $popularTitlesSortBy\\n sortRandomSeed: $sortRandomSeed\\n ) {\\n edges {\\n ...PopularTitleGraphql\\n __typename\\n }\\n pageInfo {\\n startCursor\\n endCursor\\n hasPreviousPage\\n hasNextPage\\n __typename\\n }\\n sponsoredAd {\\n ...SponsoredAdFragment\\n __typename\\n }\\n totalCount\\n __typename\\n }\\n}\\n\\nfragment PopularTitleGraphql on PopularTitlesEdge {\\n cursor\\n node {\\n id\\n objectId\\n objectType\\n content(country: $country, language: $language) {\\n title\\n fullPath\\n scoring {\\n imdbVotes\\n imdbScore\\n tmdbPopularity\\n tmdbScore\\n __typename\\n }\\n posterUrl(profile: $profile, format: $format)\\n ... on ShowContent {\\n backdrops(profile: $backdropProfile, format: $format) {\\n backdropUrl\\n __typename\\n }\\n __typename\\n }\\n isReleased\\n credits(role: DIRECTOR) {\\n name\\n __typename\\n }\\n scoring {\\n imdbVotes\\n __typename\\n }\\n runtime\\n genres {\\n translation(language: $language)\\n __typename\\n }\\n __typename\\n }\\n likelistEntry {\\n createdAt\\n __typename\\n }\\n dislikelistEntry {\\n createdAt\\n __typename\\n }\\n watchlistEntry {\\n createdAt\\n __typename\\n }\\n freeOffersCount: offerCount(\\n country: $country\\n platform: $platform\\n filter: {monetizationTypes: [FREE]}\\n )\\n watchNowOffer(country: $country, platform: $platform, filter: $watchNowFilter) {\\n id\\n standardWebURL\\n package {\\n id\\n packageId\\n clearName\\n __typename\\n }\\n retailPrice(language: $language)\\n retailPriceValue\\n lastChangeRetailPriceValue\\n currency\\n presentationType\\n monetizationType\\n availableTo\\n __typename\\n }\\n ... on Movie {\\n seenlistEntry {\\n createdAt\\n __typename\\n }\\n __typename\\n }\\n ... on Show {\\n seenState(country: $country) {\\n seenEpisodeCount\\n progress\\n __typename\\n }\\n __typename\\n }\\n __typename\\n }\\n __typename\\n}\\n\\nfragment SponsoredAdFragment on SponsoredRecommendationAd {\\n bidId\\n holdoutGroup\\n campaign {\\n externalTrackers {\\n type\\n data\\n __typename\\n }\\n hideRatings\\n promotionalImageUrl\\n watchNowLabel\\n watchNowOffer {\\n standardWebURL\\n presentationType\\n monetizationType\\n package {\\n id\\n packageId\\n shortName\\n clearName\\n icon\\n __typename\\n }\\n __typename\\n }\\n node {\\n id\\n ... on MovieOrShow {\\n content(country: $country, language: $language) {\\n fullPath\\n posterUrl\\n title\\n originalReleaseYear\\n scoring {\\n imdbScore\\n __typename\\n }\\n externalIds {\\n imdbId\\n __typename\\n }\\n backdrops(format: $format, profile: $backdropProfile) {\\n backdropUrl\\n __typename\\n }\\n isReleased\\n __typename\\n }\\n objectId\\n objectType\\n offers(country: $country, platform: $platform) {\\n monetizationType\\n presentationType\\n package {\\n id\\n packageId\\n __typename\\n }\\n id\\n __typename\\n }\\n watchlistEntry {\\n createdAt\\n __typename\\n }\\n __typename\\n }\\n ... on Show {\\n seenState(country: $country) {\\n seenEpisodeCount\\n __typename\\n }\\n __typename\\n }\\n __typename\\n }\\n __typename\\n }\\n __typename\\n}\\n"}'

	// Return data
	return await initBrowser(requestBody)
}

export const searchMovie = async (searchQuery: string, locale: string) => {
	// Extract language and country codes
	const [languageCode, countryCode] = locale.split("_")

	// Create request body
	const requestBody = `{\"operationName\":\"GetSuggestedTitles\",\"variables\":{\"country\":\"${countryCode}\",\"language\":\"${languageCode}\",\"first\":18,\"filter\":{\"searchQuery\":\"${searchQuery}\"}},\"query\":\"query GetSuggestedTitles($country: Country!, $language: Language!, $first: Int!, $filter: TitleFilter) {\\n  popularTitles(country: $country, first: $first, filter: $filter) {\\n    edges {\\n      node {\\n        ...SuggestedTitle\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment SuggestedTitle on MovieOrShow {\\n  id\\n  objectType\\n  objectId\\n  content(country: $country, language: $language) {\\n    fullPath\\n    title\\n    originalReleaseYear\\n    posterUrl\\n    fullPath\\n    __typename\\n  }\\n  __typename\\n}\\n\"}`

	// Return data
	return await initBrowser(requestBody)
}

export const getTitleDetails = async (locale: string, fullPath: string) => {
	// Extract language and country codes
	const [languageCode, countryCode] = locale.split("_")

	// Create request body
	const requestBody = JSON.stringify({
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

	// Return data
	return await initBrowser(requestBody)
}

export const getOffersByCountry = async (data: string) => {
	const [id, type] = JSON.parse(data)
	const nodeId = `t${type.charAt(0).toLowerCase()}${id}`

	const browser = await launchBrowser()
	const page = await openPage(browser, url)

	const countryCodes = JSON.stringify(
		countries.map(country => country.full_locale)
	)

	const response = await page.evaluate(
		async (nodeId: string, countryCodes: string) => {
			const countries = JSON.parse(countryCodes)

			const promises = countries.map(async (country: any) => {
				const [languageCode, countryCode] = country.split("_")
				const requestBody = {
					operationName: "GetTitleOffers",
					variables: {
						platform: "WEB",
						nodeId: nodeId,
						country: countryCode,
						language: languageCode,
						filterBuy: {
							monetizationTypes: ["BUY"],
							bestOnly: false,
							presentationTypes: ["SD", "HD", "_4K"]
						},
						filterFlatrate: {
							monetizationTypes: [
								"FLATRATE",
								"FLATRATE_AND_BUY",
								"ADS",
								"FREE",
								"CINEMA"
							],
							presentationTypes: ["SD", "HD", "_4K"],
							bestOnly: false
						},
						filterRent: {
							monetizationTypes: ["RENT"],
							presentationTypes: ["SD", "HD", "_4K"],
							bestOnly: false
						},
						filterFree: {
							monetizationTypes: ["ADS", "FREE"],
							presentationTypes: ["SD", "HD", "_4K"],
							bestOnly: false
						}
					},
					query: `
      query GetTitleOffers(
        $nodeId: ID!,
        $country: Country!,
        $language: Language!,
        $filterFlatrate: OfferFilter!,
        $filterBuy: OfferFilter!,
        $filterRent: OfferFilter!,
        $filterFree: OfferFilter!,
        $platform: Platform! = WEB
      ) {
        node(id: $nodeId) {
          id
          __typename
          ... on MovieOrShowOrSeasonOrEpisode {
            offerCount(country: $country, platform: $platform)
            flatrate: offers(
              country: $country
              platform: $platform
              filter: $filterFlatrate
            ) {
              ...TitleOffer
              __typename
            }
            buy: offers(
              country: $country
              platform: $platform
              filter: $filterBuy
            ) {
              ...TitleOffer
              __typename
            }
            rent: offers(
              country: $country
              platform: $platform
              filter: $filterRent
            ) {
              ...TitleOffer
              __typename
            }
            free: offers(
              country: $country
              platform: $platform
              filter: $filterFree
            ) {
              ...TitleOffer
              __typename
            }
            __typename
          }
        }
      }

      fragment TitleOffer on Offer {
        id
        presentationType
        monetizationType
        retailPrice(language: $language)
        retailPriceValue
        currency
        lastChangeRetailPriceValue
        type
        package {
          id
          packageId
          clearName
          technicalName
          icon(profile: S100)
          __typename
        }
        standardWebURL
        elementCount
        availableTo
        deeplinkRoku: deeplinkURL(platform: ROKU_OS)
        __typename
      }
    `
				}

				let response = await fetch(
					"https://apis.justwatch.com/graphql",
					{
						credentials: "omit",
						headers: {
							"User-Agent":
								"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0",
							Accept: "*/*",
							"Accept-Language": "en-US,en;q=0.5",
							"content-type": "application/json",
							"App-Version": "3.8.0-web-web",
							"DEVICE-ID": "XFpiKlykEe6wTkKWjpYncw",
							"Sec-Fetch-Dest": "empty",
							"Sec-Fetch-Mode": "cors",
							"Sec-Fetch-Site": "same-site"
						},
						referrer: "https://www.justwatch.com/",
						body: JSON.stringify(requestBody),
						method: "POST",
						mode: "cors"
					}
				)

				let result = await response.json()
				// return { [country]: result.data.node }
				return { locale: country, offers: result.data.node }
			})

			return Promise.all(promises)
		},
		nodeId,
		countryCodes
	)

	return response
}
