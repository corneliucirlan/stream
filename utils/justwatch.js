const API_BASE_URL = "https://apis.justwatch.com"
const HEADERS = {
	"Content-Type": "application/json",
	"X-Requested-With": "fetch",
}
export const API_IMAGES_URL = "https://images.justwatch.com"

/**
 * Fetches and returns the data for all countries
 * @returns {Object} - An object containing the data for all countries
 */
export const getAllCountries = async () => {
	return (await (await fetch(`${API_BASE_URL}/content/locales/state`))
		.json())
		.sort((a, b) => (a.country > b.country ? 1 : -1))
}

/**
 * Get a background image for the homepage from the most popular movie/show
 * @returns {String} Background image URL
 */
export const getHomepageBackdrop = async () => {

	// Get the most popular movies and shows
	let response = await fetch(
		`${API_BASE_URL}/content/titles/en_US/popular`,
		{
			method: "POST",
			body: JSON.stringify({
				content_types: ["movie", "show"],
			}),
			headers: HEADERS,
		}
	)

	// List of most popular movies and shows
	const popular = await response.json()

	// Most popular movie/show details
	const movieInfo = await getMovieInfo(
		popular.items[0].id,
		popular.items[0].object_type,
		"en_US"
	)

	// Return a backdrop URL
	return `${API_IMAGES_URL}/backdrop/${getRandomBackdropID(
		movieInfo.backdrops
	)}/s1920/${movieInfo.slug}`
}

/**
 * Get a random backdrop id from an array of ids
 * @param {Array} ids Array of ids to choose from
 * @returns {String} Randomly generated backdrop id
 */
export const getRandomBackdropID = ids =>
	ids[Math.floor(Math.random() * ids.length)]

/**
 * Sends a search query to the API and returns the results
 * @param {string} query - The search query
 * @param {string} locale - The locale of the search query (e.g. "en_US", "fr_FR")
 * @returns {Object} - An object containing the search results
 */
export const searchQuery = async (query, locale) => {

	// Fetch URL
	const url = `/api/content/titles/${locale}/popular`

	// Fetch results
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			query: query,
		}),
		headers: HEADERS,
	})

	// Return results as JSON object
	return await response.json()
}

/**
 * Fetches and returns the movie information for a given id and type
 * @param {string} id - The id of the movie
 * @param {string} type - The type of movie (e.g. "movie", "show")
 * @param {string} locale - The locale of the movie (e.g. "en_US", "fr_FR")
 * @returns {Object} - An object containing the movie information
 */
export const getMovieInfo = async (id, type, locale) => {
	
	// Fetch URL
	const url = `${API_BASE_URL}/content/titles/${type}/${id}/locale/${locale}`

	// Fetch results
	const response = await fetch(url)
	const movieInfo = await response.json()

	// Get movie data
	let {
		title,
		poster,
		object_type,
		original_release_year,
		short_description,
		credits,
	} = movieInfo

	// Update movie poster
	const posterId = getPhotoID(poster)
	poster = `${API_IMAGES_URL}/poster/${posterId}/s592/poster.webp`
	
	// Get movie backdrops IDs
	const backdrops = movieInfo.backdrops.map(backdrop =>
		getPhotoID(backdrop.backdrop_url)
	)

	// Get movie slug
	const slug = movieInfo.full_path.split('/').pop()

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
	}
}

/**
 * Fetches and returns the providers data for a given movie id and type
 * @param {string} id - The id of the movie
 * @param {string} type - The type of movie (e.g. "movie", "show")
 * @returns {Object[]} - An array of objects containing the providers data for the movie
 */
export const getMovieProviders = async (id, type) => {
	
	// Get all available countries
	const countries = await getAllCountries()

	// Loop through all countries
	let whereToStream = await Promise.all(
		countries.map(async (country) => {

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
		.sort((a, b) => (a.name > b.name ? 1 : -1))

	// Reformat the provider data and return a new array
	let revizedMovieProviders = filteredAndSorted.map((provider) => {
		let offers = provider.offers.map(
			({ provider_id, monetization_type, presentation_type }) => {
				return {
					provider_id,
					monetization_type,
					presentation_type,
				}
			}
		)

		return {
			name: provider.name,
			offers: offers,
		}
	})

	return revizedMovieProviders
}

/**
 * Fetches and returns the data for all providers
 * @returns {Object} - An object containing the data for all providers
 */
export const getAllProviders = async () => {

	// Get all countries
	const countries = await getAllCountries()

	// Fetch providers data for each country and wait for all responses
	const providers = await Promise.all(
		countries.map(async (country) => {
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
export const getPhotoID = (poster) => {

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
 * @returns {Object[]} - An array of objects containing the movie data for each country
 */
export const getMovieData = async (id, type) => {
	
	// Get movie providers
	let movieProviders = await getMovieProviders(id, type)

	// Get all providers
	let allProviders = await getAllProviders()

	// Return movie data
	return movieProviders.map(provider => {

		// Get offers by monetization type
		const getOffersByType = (providerOffers, monetization) => {

			// Filter and map offers in a single step
			let offers = providerOffers
				.filter((offer) => offer.monetization_type === monetization)
				.map(
					({
						provider_id,
						presentation_type,
						monetization_type,
					}) => ({
						id: provider_id,
						name:
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
				(groups, { id, name, icon, resolution, type }) => {
					// Create a group key from id and name
					const groupKey = `${id}-${name}`

					// If group does not exist, create it with the offer properties
					if (!groups[groupKey]) {
						groups[groupKey] = {
							id,
							name,
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
			country: provider.name,
			offers: Object.entries({ flatrate, rent, buy }).reduce(
				(acc, [key, value]) => {
					if (value !== null) {
						acc[key] = value
					}
					return acc
				},
				{}
			),
		}
	})
}
