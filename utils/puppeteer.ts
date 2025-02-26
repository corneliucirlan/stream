"use server"

import puppeteer from "puppeteer"
import countries from "./countries"
import { bodyBackgroundImage } from "./fetch/fetch-globals"

const url = "https://www.google.com"

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

export const initBrowser = async (requestBody: string) => {
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

// Get Background Image
export const getBackgroundImage = async () =>
	await initBrowser(bodyBackgroundImage)

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
				const requestBody = JSON.stringify({
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
				})

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
						body: requestBody,
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
