import { useEffect, useState } from "react"

export const getStaticProps = async () => {

	// Get all availeble countries
	const response = await fetch(`https://apis.justwatch.com/content/locales/state`)
	let countries = await response.json()
	
	// Get all available providers for every country
	let providers = {}
	await Promise.all(countries.map(async (country) => {
		let response = await fetch(`https://apis.justwatch.com/content/providers/locale/${country.full_locale}`)
		providers[country.full_locale] = await response.json()
	}))

	return {
		props: {
			countries: countries,
			providers: providers
		}
	}
}

export default ({ countries, providers }) => {

	// console.log("Countries", countries)
	// console.log("Providers", providers)

	let [ searchInput, setSearchInput ] = useState('')

	useEffect(() => {
		// console.log("Search: ", searchInput)

		// Search movie or tv show
		const search = async (query, locale) => {

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

		const getAllOffers = async (id, type) => {

			const whereToStream = []

			// Loop through all countries
			await Promise.all(countries.map(async (country) => {

				// Create movie/tv show URL for specific country
				const url = `/api/content/titles/${type}/${id}/locale/${country.full_locale}`

				// Fetch offers from the country
				const response = await fetch(url)

				// Get offers as JSON object
				const stream = await response.json()

				// Add offers to whereToStream if available
				stream.offers && whereToStream.push(stream)
			}))

			return whereToStream
		}

		// Search Movie or TV Show
		// search("black adam", 'en_US').then(response => {
		searchInput && search(searchInput, 'en_US').then(response => {
			// console.log(response.items[0])

			let id = response.items[0].id
			let type = response.items[0].object_type

			getAllOffers(id, type).then(response => console.log(response))
		})

	}, [ searchInput ])

	// Save search input
	const handleOnChange = event => setSearchInput(event.target.value)

	return (
		<div>
			<input
				type='text'
				onChange={handleOnChange}
				value={searchInput}
			/>
		</div>
	)
}
