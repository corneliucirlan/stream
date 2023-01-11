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
	let {
		title,
		poster,
		object_type,
		original_release_year,
		short_description,
		credits,
	} = await response.json()

	// Update movie poster
	const posterId = getPhotoID(poster)
	poster = `https://images.justwatch.com/poster/${posterId}/s592/poster.webp`

	// Return movie data
	return {
		title,
		poster,
		object_type,
		original_release_year,
		short_description,
		credits
	}
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

	let filteredAndSorted = whereToStream
		.filter(Boolean)
		.sort((a, b) => (a.name > b.name ? 1 : -1))

	let revizedMovieProviders = filteredAndSorted.map((provider) => {
		let offers = provider.offers.map(
			({ provider_id, monetization_type, presentation_type }) => {
				return {
					provider_id,
					monetization_type,
					presentation_type,
				};
			}
		);

		return {
			name: provider.name,
			offers: offers,
		};
	});
		
	return revizedMovieProviders
}

export const getAllProviders = async () => {
	const countries = await getAllCountries()
	const providers = await Promise.all(countries.map(country =>
		fetch(`https://apis.justwatch.com/content/providers/locale/${country.full_locale}`)
			.then(response => response.json())
	))

	let reducedProviders = providers.reduce((acc, provider) => {
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

	let revizedallProviders = {};
	Object.values(reducedProviders).forEach((provider, key) => {
		revizedallProviders[key] = {
			clear_name: provider.clear_name,
			icon_url: provider.icon_url,
		};
	});

	return revizedallProviders
}

export const getPhotoID = poster => {

	// Photo regex pattern
	const photoRegex = new RegExp("\\s*([0-9]+)")
	
	let photo = photoRegex.exec(poster)
	if (photo === null) return null
	
	// Return photo id
	return photo[0]
}

export const getMovieData = async (id, type) => {
	
	// Get movie providers
	let movieProviders = await getMovieProviders(id, type)
	
	// Get all providers
	let allProviders = await getAllProviders()

	// Return movie data
	return movieProviders.map((provider) => {

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
								? `https://images.justwatch.com/icon/${getPhotoID(
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
			)
		}
	})
}
