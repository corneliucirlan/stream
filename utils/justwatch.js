// Get all available countries
export const getAllCountries = async () => {
	return await (await fetch(`https://apis.justwatch.com/content/locales/state`)).json()
}

// Search for input query on JustWatch
export const searchQuery = async (query, locale) => {

	// Fetch URL
	const url = `/api/content/titles/${locale}/popular`

	// Query body
	const body = {
		"query": query,
	}

	// Fetch results
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			"X-Requested-With": "fetch"
		}
	})

	// Return results as JSON object
	return await response.json()
}

// Get all information about a movie or tv show
export const getMovieInfo = async (id, type, locale) => {

	// Fetch URL
	const url = `https://apis.justwatch.com/content/titles/${type}/${id}/locale/${locale}`

	// Fetch results
	const response = await fetch(url)

	// Get movie data
	let movieData = await response.json()

	// Update movie poster
	movieData.poster = `https://images.justwatch.com/poster/${getPhotoID(movieData.poster)}/s592/poster.webp`

	// Return movie data
	return movieData
}

// Get all streaming platforms available for a movie or tv show worldwide
export const getMovieProviders = async (id, type) => {

	// Get all available countries
	const countries = await getAllCountries()

	// Loop through all countries
	let whereToStream = await Promise.all(countries.map(async (country) => {

		// Create movie/tv show URL for specific country
		const url = `https://apis.justwatch.com/content/titles/${type}/${id}/locale/${country.full_locale}`

		// Fetch offers from the country
		const response = await fetch(url)

		// Get offers as JSON object
		const stream = await response.json()

		// No offers available
		if (! stream.offers) return null
		
		// Return offers if available
		return {
			name: country.country,
			// full_locale: country.full_locale,
			offers: stream.offers
		}
	}))

	return whereToStream.filter(Boolean).sort((a,b)=> (a.name > b.name ? 1 : -1))
}

export const getAllProviders = async () => {
	const countries = await getAllCountries()
	const providers = await Promise.all(countries.map(country =>
		fetch(`https://apis.justwatch.com/content/providers/locale/${country.full_locale}`)
			.then(response => response.json())
	))

	return providers.reduce((acc, provider) => {
		provider.forEach((p) => {
			if (!acc[p.id.toString()]) {
				acc[p.id.toString()] = {
					technical_name: p.technical_name,
					slug: p.slug,
					short_name: p.short_name,
					clear_name: p.clear_name,
					icon_url: p.icon_url,
					icon_blur_hash: p.icon_blur_hash,
				}
			}
    	})

		return acc
	}, {})
}

export const getPhotoID = poster => {

	// Photo regex pattern
	const photoRegex = new RegExp("\\s*([0-9]+)")

	// Return photo id
	return photoRegex.exec(poster)[0]
}
