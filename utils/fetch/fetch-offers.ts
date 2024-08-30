import { fetchOptions, JUSTWATCH_GRAPH_URL } from "@/utils/fetch/fetch-globals"
import { OfferCountry, OfferCategory, OfferItem, Country } from "@/utils/types"
import fetchCountries from "./fetch-countries"
import { getOffersByCountry } from "../puppeteer"

const offersByCountry = (country: any): OfferCountry | null => {
	// Create country offers array
	let offers: Array<OfferCategory> = []

	// Process all offer types
	const offerTypes = [
		{
			name: "Stream",
			offers: combineAndGroupByPackageId(country.offers.flatrate)
		},
		{
			name: "Buy",
			offers: combineAndGroupByPackageId(country.offers.buy)
		},
		{
			name: "Rent",
			offers: combineAndGroupByPackageId(country.offers.rent)
		},
		{
			name: "Free",
			offers: combineAndGroupByPackageId(country.offers.free)
		}
	]

	// Add all available offers
	for (const offerType of offerTypes) {
		if (offerType.offers.length !== 0) {
			offers.push(offerType)
		}
	}

	// Return offers if available
	return offers.length > 0
		? { name: country.name, locale: country.locale, offers }
		: null
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
		} else if (
			!combinedOffers[packageId].presentationTypes.includes(
				offer.presentationType
			)
		) {
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

export const fetchOffersByTitle = async (
	id: number,
	type: string
): Promise<OfferCountry[] | void> => {
	// Get all available countries
	const countries = await fetchCountries()
	const rawData = await getOffersByCountry(JSON.stringify([id, type]))

	for (const index in countries)
		rawData[index].name = countries[index].country

	// Get all offers by country
	const allOffers = rawData.map((data: any) => {
		return offersByCountry(data)
	})

	// Filter out empty offers
	const filtered = allOffers.filter((value: any) => value !== null)

	// Return all available offers
	return filtered
}

export default fetchOffersByTitle
