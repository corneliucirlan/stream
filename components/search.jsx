"use client"

import { useEffect, useState } from "react"
import {
	DEFAULT_LOCALE,
	HEADERS,
	API_IMAGES_URL,
	getPhotoID
} from "../utils/justwatch"
import MovieCard from "./movie-card"

export default ({ countries }) => {
	const inputKey = "searchInput"
	const localeKey = "searchLocale"
	const resultsKey = "searchResults"

	// Store search locale / country
	let [searchLocale, setSearchLocale] = useState(DEFAULT_LOCALE)

	// Store search box state
	let [searchInput, setSearchInput] = useState("")

	// Store search results
	let [searchResults, setSearchResults] = useState(null)

	// Save search country
	const handleLocaleChange = (event) => {
		// Update search locale state
		setSearchLocale(event.target.value)

		// Update session storage search locale
		sessionStorage.setItem(localeKey, event.target.value.toString())
	}

	// Save search input
	const handleSearchChange = (event) => {
		// Get input value
		const value = event.target.value

		// Update search & result
		if (value === "") {
			sessionStorage.removeItem(inputKey)
			sessionStorage.removeItem(resultsKey)
			setSearchInput("")
			setSearchResults(null)
		} else {
			setSearchInput(event.target.value)
			sessionStorage.setItem(inputKey, event.target.value.toString())
		}
	}

	// Check session storage
	useEffect(() => {
		// Update search input if available
		const searchInput = sessionStorage.getItem(inputKey)
		searchInput && setSearchInput(searchInput)

		// Update search locale if available
		const searchLocale = sessionStorage.getItem(localeKey)
		searchLocale && setSearchLocale(searchLocale)

		// Update search results if available
		const searchresults = sessionStorage.getItem(resultsKey)
		searchresults &&
			searchInput &&
			setSearchResults(JSON.parse(searchresults))
	}, [])

	// Get the search results
	useEffect(() => {
		// Fetch URL
		const url = `/api/content/titles/${searchLocale}/popular`

		// Abort controller
		const controller = new AbortController()

		// Search Movie or TV Show
		searchInput &&
			fetch(url, {
				method: "POST",
				body: JSON.stringify({
					query: searchInput
				}),
				headers: HEADERS,
				signal: controller.signal
			})
				.then((response) => {
					response.json().then((data) => {
						const items = data.items.map((item) => {
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

						// Update search results state
						setSearchResults(items)

						// Update session storage search results
						sessionStorage.getItem(inputKey) &&
							sessionStorage.setItem(
								resultsKey,
								JSON.stringify(items)
							)
					})
				})
				.catch((error) => console.log(error))

		// Abort fetch request if component ummounts
		return () => controller.abort()
	}, [searchInput, searchLocale])

	return (
		<div className="container">
			<div className="row justify-content-center search-box">
				<div className="col-12 col-md-2">
					<select
						defaultValue={DEFAULT_LOCALE}
						className="form-control"
						onChange={handleLocaleChange}
					>
						{countries !== null &&
							countries.map((country) => (
								<option
									key={country.exposed_url_part}
									value={country.full_locale}
								>
									{country.country}
								</option>
							))}
					</select>
				</div>

				<div className="col-12 col-md-4">
					<input
						type="text"
						className="form-control"
						onChange={handleSearchChange}
						value={searchInput}
						placeholder="Search for a movie or tv show"
						autoFocus={true}
					/>
				</div>
			</div>

			<div className="row">
				{searchResults !== null &&
					searchResults.map((result) => (
						<MovieCard
							key={result.id}
							id={result.id}
							title={result.title}
							type={result.type}
							poster={result.poster}
							locale={searchLocale}
							releaseYear={result.releaseYear}
						/>
					))}
			</div>
		</div>
	)
}
