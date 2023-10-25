import { fetchOptions, JUSTWATCH_GRAPH_URL } from "@/utils/fetch/fetch-globals"
import { OfferCountry, OfferCategory, OfferItem } from "@/utils/types"
import fetchCountries from "./fetch-countries"

const fetchOffersbyCountry = async (
	id: number,
	type: string,
	locale: string
): Promise<OfferCategory[]> => {
	// Split locale into languate and country code
	const [languageCode, countryCode] = locale.split("_")

	// // Justwatch API request
	// const request: Response = await fetch(JUSTWATCH_GRAPH_URL, {
	// 	...fetchOptions,
	// 	body:
	// 		'{"operationName":"GetTitleOffers","variables":{"platform":"WEB","nodeId":"t' +
	// 		type.charAt(0).toLowerCase() +
	// 		id +
	// 		'","country":"' +
	// 		countryCode +
	// 		'","language":"' +
	// 		languageCode +
	// 		'","filterBuy":{"monetizationTypes":["BUY"],"bestOnly":false,"presentationTypes":["SD", "HD", "_4K"]},"filterFlatrate":{"monetizationTypes":["FLATRATE","FLATRATE_AND_BUY","ADS","FREE","CINEMA"],"presentationTypes":["SD", "HD", "_4K"],"bestOnly":false},"filterRent":{"monetizationTypes":["RENT"],"presentationTypes":["SD", "HD", "_4K"],"bestOnly":false},"filterFree":{"monetizationTypes":["ADS","FREE"],"presentationTypes":["SD", "HD", "_4K"],"bestOnly":false}},"query":"query GetTitleOffers($nodeId: ID!, $country: Country!, $language: Language!, $filterFlatrate: OfferFilter!, $filterBuy: OfferFilter!, $filterRent: OfferFilter!, $filterFree: OfferFilter!, $platform: Platform! = WEB) {\\n  node(id: $nodeId) {\\n    id\\n    __typename\\n    ... on MovieOrShowOrSeasonOrEpisode {\\n      offerCount(country: $country, platform: $platform)\\n      flatrate: offers(\\n        country: $country\\n        platform: $platform\\n        filter: $filterFlatrate\\n      ) {\\n        ...TitleOffer\\n        __typename\\n      }\\n      buy: offers(country: $country, platform: $platform, filter: $filterBuy) {\\n        ...TitleOffer\\n        __typename\\n      }\\n      rent: offers(country: $country, platform: $platform, filter: $filterRent) {\\n        ...TitleOffer\\n        __typename\\n      }\\n      free: offers(country: $country, platform: $platform, filter: $filterFree) {\\n        ...TitleOffer\\n        __typename\\n      }\\n      __typename\\n    }\\n  }\\n}\\n\\nfragment TitleOffer on Offer {\\n  id\\n  presentationType\\n  monetizationType\\n  retailPrice(language: $language)\\n  retailPriceValue\\n  currency\\n  lastChangeRetailPriceValue\\n  type\\n  package {\\n    id\\n    packageId\\n    clearName\\n    technicalName\\n    icon(profile: S100)\\n    __typename\\n  }\\n  standardWebURL\\n  elementCount\\n  availableTo\\n  deeplinkRoku: deeplinkURL(platform: ROKU_OS)\\n  __typename\\n}\\n"}'
	// })

	const presentationTypes = ["SD", "HD", "_4K"]

	const request: Response = await fetch(JUSTWATCH_GRAPH_URL, {
		...fetchOptions,
		body: JSON.stringify({
			operationName: "GetTitleOffers",
			variables: {
				platform: "WEB",
				nodeId: `t${type.charAt(0).toLowerCase()}${id}`,
				country: countryCode,
				language: languageCode,
				filterBuy: {
					monetizationTypes: ["BUY"],
					bestOnly: false,
					presentationTypes: presentationTypes
				},
				filterFlatrate: {
					monetizationTypes: [
						"FLATRATE",
						"FLATRATE_AND_BUY",
						"ADS",
						"FREE",
						"CINEMA"
					],
					presentationTypes: presentationTypes,
					bestOnly: false
				},
				filterRent: {
					monetizationTypes: ["RENT"],
					presentationTypes: presentationTypes,
					bestOnly: false
				},
				filterFree: {
					monetizationTypes: ["ADS", "FREE"],
					presentationTypes: presentationTypes,
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
	})

	// Justwatch JSON response
	const response = await request.json()

	// Create country offers array
	let countryOffers: Array<OfferCategory> = []

	// Process all offer types
	const offerTypes = [
		{
			name: "Stream",
			offers: combineAndGroupByPackageId(response.data.node.flatrate)
		},
		{
			name: "Buy",
			offers: combineAndGroupByPackageId(response.data.node.buy)
		},
		{
			name: "Rent",
			offers: combineAndGroupByPackageId(response.data.node.rent)
		},
		{
			name: "Free",
			offers: combineAndGroupByPackageId(response.data.node.free)
		}
	]

	// Add all available offers
	for (const offerType of offerTypes) {
		if (offerType.offers.length !== 0) {
			countryOffers.push(offerType)
		}
	}

	// Return all available offers for a country
	return countryOffers
}

const combineAndGroupByPackageId = (offers: any[]): Array<OfferItem> => {
	const combinedOffers: Array<OfferItem> = []

	// Iterate through the offers and group them by packageId
	offers.forEach((offer: any) => {
		// Replace _4K with 4K in the presentationType
		if (offer.presentationType === "_4K") {
			offer.presentationType = "4K"
		}

		const packageId: number = offer.package.id

		if (!combinedOffers[packageId]) {
			combinedOffers[packageId] = { ...offer }
			combinedOffers[packageId].presentationTypes = [
				offer.presentationType
			]
			delete combinedOffers[packageId].presentationType
		} else {
			combinedOffers[packageId].presentationTypes.push(
				offer.presentationType
			)
			delete offer.presentationType
		}
	})
	// Convert the combined offers object back to an array
	const result = Object.values(combinedOffers)

	return result
}

const fetchOffersByTitle = async (
	id: number,
	type: string
): Promise<OfferCountry[] | void> => {
	// Get all available countries
	const countries = await fetchCountries()

	// console.log(countries)
	const promises = countries.map(country => {
		const name = country.country
		const locale = country.full_locale

		return fetchOffersbyCountry(id, type, country.full_locale).then(
			offers => {
				return { name, locale, offers }
			}
		)
	})

	return Promise.all(promises)
		.then(allOffers => {
			// Handle the results here
			const filtered = allOffers.filter(
				offer => offer?.offers?.length > 0
			)
			return filtered
		})
		.catch(error => console.error(error))
}

export default fetchOffersByTitle
