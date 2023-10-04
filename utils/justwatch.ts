import { Offer, OfferType, OfferItem } from "./interface/offers"
import BackdropData from "./interface/backdrop"
import SearchResult from "./interface/search-result"
import Country from "./interface/country"
import {
	StreamProvider,
	SingleOfferForMovie,
	MovieDetails,
	OffersForMovie
} from "./interface/jw"

export const API_BASE_URL = "https://apis.justwatch.com"
export const HEADERS = {
	"Content-Type": "application/json",
	"X-Requested-With": "fetch"
}
export const API_IMAGES_URL = "https://images.justwatch.com"
export const DEFAULT_LOCALE = "en_US"

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
				offers: stream.offers
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
					presentation_type
				}: SingleOfferForMovie) => {
					return {
						provider_id,
						monetization_type,
						presentation_type
					}
				}
			)

			return {
				name: provider!.name,
				offers: offers
			}
		}
	)

	return revizedMovieProviders
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
				icon_url: provider.icon_url
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

/**
 * Fetches and returns movie data for a given movie id and type
 * @param {string} id - The id of the movie
 * @param {string} type - The type of movie (e.g. "movie", "show")
 * @returns {Offer[]} - An array of objects containing the movie data for each country
 */
export const getMovieData = async (
	id: number,
	type: string
): Promise<Offer[]> => {
	// Get movie providers
	let movieProviders = await getMovieProviders(id, type)

	// Get all providers
	let allProviders = await getAllProviders()

	// Return movie data
	let data = movieProviders.map(provider => {
		// Get streaming offers
		let flatrate = getOffersByType(
			allProviders,
			provider.offers,
			"flatrate"
		)

		// Get renting offers
		let rent = getOffersByType(allProviders, provider.offers, "rent")

		// Get buying offers
		let buy = getOffersByType(allProviders, provider.offers, "buy")

		const offers: OfferType[] = []
		if (flatrate !== null) offers.push({ flatrate: flatrate })
		if (rent !== null) offers.push({ rent: rent })
		if (buy !== null) offers.push({ buy: buy })

		return {
			countryName: provider.name,
			offers: offers
		}
	})

	// Filter out empty elements
	return data.filter(result => result.offers.length > 0)
}

// Get offers by monetization type
const getOffersByType = (
	allProviders: StreamProvider[],
	providerOffers: SingleOfferForMovie[],
	monetization: string
) => {
	let offers = providerOffers
		.filter(offer => offer.monetization_type === monetization)
		.map(({ provider_id, presentation_type, monetization_type }) => ({
			id: provider_id,
			providerName:
				typeof allProviders[provider_id] !== "undefined" &&
				typeof allProviders[provider_id].clear_name === "string"
					? allProviders[provider_id].clear_name
					: null,
			icon:
				typeof allProviders[provider_id] !== "undefined"
					? `${API_IMAGES_URL}/icon/${getPhotoID(
							allProviders[provider_id].icon_url
					  )}/s100`
					: null,
			resolution: presentation_type,
			type: monetization_type
		}))

	const groupedOffers = offers.reduce(
		(
			groups: { [groupKey: string]: OfferItem },
			{ id, providerName, icon, resolution, type }
		) => {
			if (typeof providerName !== "string") {
				return groups // Skip this entry
			}

			const groupKey = `${id}-${providerName}`

			if (!groups[groupKey]) {
				groups[groupKey] = {
					id,
					providerName,
					icon,
					resolutions: [],
					type
				}
			}

			groups[groupKey].resolutions.push(resolution)

			return groups
		},
		{}
	)

	let list = Object.values(groupedOffers)

	return list.length > 0 ? list : null
}

/**
 * Transforms search results data by mapping each item to a new format.
 *
 * @param {Object} data - The search results data.
 * @returns {Array} - An array of transformed search results.
 */
export const mapResults = (data: any): SearchResult[] => {
	return data.items.map((item: any) => {
		return {
			id: item.id,
			title: item.title,
			poster: `${API_IMAGES_URL}/poster/${getPhotoID(
				item.poster
			)}/s592/poster.webp`,
			posterBlurHash: item.poster_blur_hash,
			type: item.object_type,
			releaseYear: item.original_release_year
		}
	})
}

/**
 * Fetches and returns the movie information for a given id and type
 * @param {string} id - The id of the movie
 * @param {string} type - The type of movie (e.g. "movie", "show")
 * @param {string} locale - The locale of the movie (e.g. "en_US", "fr_FR")
 * @returns {Object} - An object containing the movie information
 */
export const getMovieDetails = async (
	id: number,
	type: string,
	locale: string
): Promise<MovieDetails> => {
	// Fetch URL
	const url = `${API_BASE_URL}/content/titles/${type}/${id}/locale/${locale}`

	// Fetch results
	const response = await fetch(url)
	const movieDetails = await response.json()

	// Get movie data
	let {
		title,
		poster,
		object_type,
		original_release_year,
		short_description,
		credits
	} = movieDetails
	// Update movie poster
	const posterId = getPhotoID(poster)
	poster = `${API_IMAGES_URL}/poster/${posterId}/s592/poster.webp`

	// Get movie backdrops IDs
	const backdrops = movieDetails?.backdrops?.map(
		(backdrop: { backdrop_url: string; backdrop_blur_hash: string }) =>
			getPhotoID(backdrop.backdrop_url)
	)

	// Get IMDB ID
	const imdb = movieDetails.external_ids.filter(
		id => id.provider === "imdb"
	)[0].external_id

	// Get movie slug
	const slug = movieDetails.full_path
		? movieDetails.full_path.split("/").pop()
		: null

	// Return movie data
	return {
		title,
		poster,
		backdrops,
		slug,
		object_type,
		original_release_year,
		short_description,
		credits,
		imdb
	}
}

/**
 * Get a random backdrop id from an array of ids
 * @param {Array} ids Array of ids to choose from
 * @returns {String} Randomly generated backdrop id
 */
export const getRandomBackdropID = (ids: Array<number>) =>
	ids !== null && ids !== undefined
		? ids[Math.floor(Math.random() * ids.length)]
		: null

/**
 * Get a background image for the homepage from the most popular movie/show
 * @returns {Object} Background id and slug
 */
export const getHomepageBackdrop = async (): Promise<BackdropData> => {
	// Get the most popular movies and shows
	let response = await fetch(
		`${API_BASE_URL}/content/titles/${DEFAULT_LOCALE}/popular`,
		{
			method: "POST",
			body: JSON.stringify({
				content_types: ["movie", "show"]
			}),
			headers: HEADERS
		}
	)

	// List of most popular movies and shows
	const popular = await response.json()

	// Most popular movie/show details
	const MovieDetails = await getMovieDetails(
		popular.items[0].id,
		popular.items[0].object_type,
		DEFAULT_LOCALE
	)

	// Return background id and slug
	return {
		id: getRandomBackdropID(MovieDetails.backdrops),
		slug: MovieDetails.slug
	}
}
