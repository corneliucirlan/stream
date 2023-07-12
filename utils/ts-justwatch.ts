import { AllOffers } from "./interface/offers"

export const API_BASE_URL = "https://apis.justwatch.com"
export const HEADERS = {
	"Content-Type": "application/json",
	"X-Requested-With": "fetch",
}
export const API_IMAGES_URL = "https://images.justwatch.com"
export const DEFAULT_LOCALE = "en_US"

export type Country = {
	country: string
	full_locale: string
}

/**
 * Fetches and returns the data for all countries
 * @returns {Object} - An object containing the data for all countries
 */
export const getAllCountries = async (): Promise<Country[]> => {
	const response = await fetch(`${API_BASE_URL}/content/locales/state`)
	const countries: Country[] = await response.json()

	return countries.sort((a: Country, b: Country) =>
		a.country > b.country ? 1 : -1
	)
}

/**
 *
 * {
 * 	name: 'Andorra',
 * 	offers: [
 * 		{
 *     provider_id: 119,
 *     monetization_type: 'flatrate',
 *     presentation_type: '4k'
 *   },
 *  ...
 *	]
 * }
 */

type SingleOfferForMovie = {
	provider_id: number
	monetization_type: string
	presentation_type: string
}

type OffersForMovie = {
	name: string
	offers: Array<SingleOfferForMovie>
}

// export const getAllOffersForMovie = async (id: number, type: string): Promise<AllOffers[]> => {
export const getMovieProviders = async (
	id: number,
	type: string
): Promise<OffersForMovie[]> => {
	// Get all available countries
	const countries = await getAllCountries()

	// Loop through all countries
	let whereToStream = await Promise.all(
		countries.map(async country => {
			// Create movie/tv show URL for specific country
			const url = `${API_BASE_URL}/content/titles/${type}/${id}/locale/${country.full_locale}`

			// Fetch offers from the country
			const response = await fetch(url)

			// Get offers as JSON object
			const stream = await response.json()

			// No offers available
			if (!stream.offers) return null

			// Return offers if available
			return {
				name: country.country,
				// full_locale: country.full_locale,
				offers: stream.offers,
			}
		})
	)

	// Fiter out null values and sort by name
	let filteredAndSorted = whereToStream
		.filter(Boolean)
		.sort((a, b) => (a!.name > b!.name ? 1 : -1))

	// Reformat the provider data and return a new array
	let revizedMovieProviders: OffersForMovie[] = filteredAndSorted.map(
		provider => {
			let offers = provider!.offers.map(
				({
					provider_id,
					monetization_type,
					presentation_type,
				}: SingleOfferForMovie) => {
					return {
						provider_id,
						monetization_type,
						presentation_type,
					}
				}
			)

			return {
				name: provider!.name,
				offers: offers,
			}
		}
	)

	return revizedMovieProviders
}

type StreamProvider = {
	[key: number]: {
		clear_name: string
		icon_url: string
	}
}

/**
 * Fetches and returns the data for all providers
 * @returns {Object} - An object containing the data for all providers
 */
export const getAllProviders = async (): Promise<StreamProvider[]> => {
	// Get all countries
	const countries = await getAllCountries()

	// Fetch providers data for each country and wait for all responses
	const providers = await Promise.all(
		countries.map(async country => {
			const response = await fetch(
				`${API_BASE_URL}/content/providers/locale/${country.full_locale}`
			)
			return response.json()
		})
	)

	// Flatten the providers array, and reduce it to an object containing only unique providers
	return providers.flat().reduce((acc, provider) => {
		if (!acc[provider.id]) {
			acc[provider.id] = {
				clear_name: provider.clear_name,
				icon_url: provider.icon_url,
			}
		}
		return acc
	}, {})
}

/**
 * Extracts the photo id from a poster string
 * @param {string} poster - The poster string to extract the photo id from
 * @returns {string|null} - The photo id, or null if not found
 */
export const getPhotoID = (poster: string): string | null => {
	// Regular expression to match photo id
	const photoRegex = /\s*([0-9]+)/

	// Execute the regular expression on the poster string
	const photo = photoRegex.exec(poster)

	// Return the matched photo id, or null if not found
	return photo?.[0] || null
}

type Groups = {
	[key: string]:
		| {
				id: number
				providerName: string
				icon: string | null
				resolutions: Array<string>
				type: string
		  }
		| any
}

/**
 * Fetches and returns movie data for a given movie id and type
 * @param {string} id - The id of the movie
 * @param {string} type - The type of movie (e.g. "movie", "show")
 * @returns {Object[]} - An array of objects containing the movie data for each country
 */
export const getMovieData = async (id: number, type: string) => {
	// Get movie providers
	let movieProviders = await getMovieProviders(id, type)

	// Get all providers
	let allProviders = await getAllProviders()

	// Return movie data
	let data = movieProviders.map(provider => {
		// Get offers by monetization type
		const getOffersByType = (
			providerOffers: SingleOfferForMovie[],
			monetization: string
		) => {
			// Filter and map offers in a single step
			let offers = providerOffers
				.filter(offer => offer.monetization_type === monetization)
				.map(
					({
						provider_id,
						presentation_type,
						monetization_type,
					}) => ({
						id: provider_id,
						providerName:
							typeof allProviders[provider_id] !== "undefined" &&
							allProviders[provider_id].clear_name,
						icon:
							typeof allProviders[provider_id] !== "undefined"
								? `${API_IMAGES_URL}/icon/${getPhotoID(
										allProviders[provider_id].icon_url
								  )}/s100`
								: null,
						resolution: presentation_type,
						type: monetization_type,
					})
				)

			// Group offers by id and name
			const groupedOffers = offers.reduce(
				(
					groups: Groups,
					{ id, providerName, icon, resolution, type }
				) => {
					// Create a group key from id and name
					const groupKey = `${id}-${providerName}`

					// If group does not exist, create it with the offer properties
					if (!groups[groupKey]) {
						groups[groupKey] = {
							id,
							providerName,
							icon,
							resolutions: [],
							type,
						}
					}

					// Add resolution to group
					groups[groupKey].resolutions.push(resolution)

					return groups
				},
				{}
			)

			// Convert grouped offers object to array
			let list = Object.values(groupedOffers)

			// Return array if not empty
			return list.length > 0 ? list : null
		}

		// Get offers
		let flatrate = getOffersByType(provider.offers, "flatrate")
		let rent = getOffersByType(provider.offers, "rent")
		let buy = getOffersByType(provider.offers, "buy")

		return {
			countryName: provider.name,
			offers: Object.entries({ flatrate, rent, buy }).reduce(
				(acc: Groups, [key, value]) => {
					value !== null && acc[key] = value
					return acc
				},
				{}
			),
		}
	})

	// Filter out empty elements
	return data.filter(result => Object.entries(result.offers).length > 0)
}
