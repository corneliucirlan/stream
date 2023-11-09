"use server"

import puppeteer from "puppeteer"

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

export const getBackgroundImage = async () => {
	const browser = await launchBrowser()
	const page = await openPage(browser, url)

	const requestBody =
		'{"operationName":"GetPopularTitles","variables":{"first":1,"platform":"WEB","popularTitlesSortBy":"POPULAR","sortRandomSeed":0,"popularAfterCursor":"","popularTitlesFilter":{"ageCertifications":[],"excludeGenres":[],"excludeProductionCountries":[],"genres":[],"objectTypes":[],"productionCountries":[],"packages":["nfx"],"excludeIrrelevantTitles":false,"presentationTypes":[],"monetizationTypes":[]},"watchNowFilter":{"packages":["nfx"],"monetizationTypes":[]},"language":"en","country":"US","allowSponsoredRecommendations":{"country":"US","platform":"WEB","pageType":"VIEW_POPULAR","language":"en"}},"query":"query GetPopularTitles($allowSponsoredRecommendations: SponsoredRecommendationsInput, $backdropProfile: BackdropProfile, $country: Country!, $first: Int! = 70, $format: ImageFormat, $language: Language!, $platform: Platform! = WEB, $popularAfterCursor: String, $popularTitlesFilter: TitleFilter, $popularTitlesSortBy: PopularTitlesSorting! = POPULAR, $profile: PosterProfile, $sortRandomSeed: Int! = 0, $watchNowFilter: WatchNowOfferFilter!) {\\n popularTitles(\\n after: $popularAfterCursor\\n allowSponsoredRecommendations: $allowSponsoredRecommendations\\n country: $country\\n filter: $popularTitlesFilter\\n first: $first\\n sortBy: $popularTitlesSortBy\\n sortRandomSeed: $sortRandomSeed\\n ) {\\n edges {\\n ...PopularTitleGraphql\\n __typename\\n }\\n pageInfo {\\n startCursor\\n endCursor\\n hasPreviousPage\\n hasNextPage\\n __typename\\n }\\n sponsoredAd {\\n ...SponsoredAdFragment\\n __typename\\n }\\n totalCount\\n __typename\\n }\\n}\\n\\nfragment PopularTitleGraphql on PopularTitlesEdge {\\n cursor\\n node {\\n id\\n objectId\\n objectType\\n content(country: $country, language: $language) {\\n title\\n fullPath\\n scoring {\\n imdbVotes\\n imdbScore\\n tmdbPopularity\\n tmdbScore\\n __typename\\n }\\n posterUrl(profile: $profile, format: $format)\\n ... on ShowContent {\\n backdrops(profile: $backdropProfile, format: $format) {\\n backdropUrl\\n __typename\\n }\\n __typename\\n }\\n isReleased\\n credits(role: DIRECTOR) {\\n name\\n __typename\\n }\\n scoring {\\n imdbVotes\\n __typename\\n }\\n runtime\\n genres {\\n translation(language: $language)\\n __typename\\n }\\n __typename\\n }\\n likelistEntry {\\n createdAt\\n __typename\\n }\\n dislikelistEntry {\\n createdAt\\n __typename\\n }\\n watchlistEntry {\\n createdAt\\n __typename\\n }\\n freeOffersCount: offerCount(\\n country: $country\\n platform: $platform\\n filter: {monetizationTypes: [FREE]}\\n )\\n watchNowOffer(country: $country, platform: $platform, filter: $watchNowFilter) {\\n id\\n standardWebURL\\n package {\\n id\\n packageId\\n clearName\\n __typename\\n }\\n retailPrice(language: $language)\\n retailPriceValue\\n lastChangeRetailPriceValue\\n currency\\n presentationType\\n monetizationType\\n availableTo\\n __typename\\n }\\n ... on Movie {\\n seenlistEntry {\\n createdAt\\n __typename\\n }\\n __typename\\n }\\n ... on Show {\\n seenState(country: $country) {\\n seenEpisodeCount\\n progress\\n __typename\\n }\\n __typename\\n }\\n __typename\\n }\\n __typename\\n}\\n\\nfragment SponsoredAdFragment on SponsoredRecommendationAd {\\n bidId\\n holdoutGroup\\n campaign {\\n externalTrackers {\\n type\\n data\\n __typename\\n }\\n hideRatings\\n promotionalImageUrl\\n watchNowLabel\\n watchNowOffer {\\n standardWebURL\\n presentationType\\n monetizationType\\n package {\\n id\\n packageId\\n shortName\\n clearName\\n icon\\n __typename\\n }\\n __typename\\n }\\n node {\\n id\\n ... on MovieOrShow {\\n content(country: $country, language: $language) {\\n fullPath\\n posterUrl\\n title\\n originalReleaseYear\\n scoring {\\n imdbScore\\n __typename\\n }\\n externalIds {\\n imdbId\\n __typename\\n }\\n backdrops(format: $format, profile: $backdropProfile) {\\n backdropUrl\\n __typename\\n }\\n isReleased\\n __typename\\n }\\n objectId\\n objectType\\n offers(country: $country, platform: $platform) {\\n monetizationType\\n presentationType\\n package {\\n id\\n packageId\\n __typename\\n }\\n id\\n __typename\\n }\\n watchlistEntry {\\n createdAt\\n __typename\\n }\\n __typename\\n }\\n ... on Show {\\n seenState(country: $country) {\\n seenEpisodeCount\\n __typename\\n }\\n __typename\\n }\\n __typename\\n }\\n __typename\\n }\\n __typename\\n}\\n"}'

	const response = await fetchDataFromAPI(page, requestBody)

	await browser.close()
	return response
}

export const searchMovie = async (searchQuery: string) => {
	const browser = await launchBrowser()
	const page = await openPage(browser, url)

	const requestBody = `{\"operationName\":\"GetSuggestedTitles\",\"variables\":{\"country\":\"US\",\"language\":\"en\",\"first\":18,\"filter\":{\"searchQuery\":\"${searchQuery}\"}},\"query\":\"query GetSuggestedTitles($country: Country!, $language: Language!, $first: Int!, $filter: TitleFilter) {\\n  popularTitles(country: $country, first: $first, filter: $filter) {\\n    edges {\\n      node {\\n        ...SuggestedTitle\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment SuggestedTitle on MovieOrShow {\\n  id\\n  objectType\\n  objectId\\n  content(country: $country, language: $language) {\\n    fullPath\\n    title\\n    originalReleaseYear\\n    posterUrl\\n    fullPath\\n    __typename\\n  }\\n  __typename\\n}\\n\"}`

	const response = await fetchDataFromAPI(page, requestBody)

	await browser.close()
	return response
}

export const getTitleDetails = async (body: string) => {
	const browser = await launchBrowser()
	const page = await openPage(browser, url)

	const response = await fetchDataFromAPI(page, body)

	await browser.close()
	return response
}

export const getOffersByCountry = async (body: string) => {
	const browser = await launchBrowser()
	const page = await openPage(browser, url)

	const response = await fetchDataFromAPI(page, body)

	await browser.close()
	return response
}
