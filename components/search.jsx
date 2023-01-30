"use client"

import { useEffect, useState } from "react"

import MovieCard from "./movie-card"
import {
	API_IMAGES_URL,
	DEFAULT_LOCALE,
	getPhotoID,
	searchQuery,
} from "../utils/justwatch"

export default ({ countries }) => {
	
	// Store search locale / country
	let [searchLocale, setSearchLocale] = useState(DEFAULT_LOCALE)

	// Store search box state
	let [searchInput, setSearchInput] = useState("")

	// Store search results
	let [searchResults, setSearchResults] = useState([])

	// Get the search results
	useEffect(() => {

		// Search Movie or TV Show
		searchInput &&
			searchQuery(searchInput, searchLocale).then((response) => {
				const items = response.items.map((item) => {
					return {
						id: item.id,
						title: item.title,
						poster: `${API_IMAGES_URL}/poster/${getPhotoID(
							item.poster
						)}/s592/poster.webp`,
						posterBlurHash: item.poster_blur_hash,
						type: item.object_type,
						releaseYear: item.original_release_year,
					}
				})

				setSearchResults(items)
			})
	}, [searchInput, searchLocale])

	// Save search country
	const handleLocaleChange = (event) => setSearchLocale(event.target.value)

	// Save search input
	const handleSearchChange = (event) => setSearchInput(event.target.value)

	return (
		<div className="container">
			<div className="row justify-content-center search-box">
				<div className="col-12 col-md-2">
					<select
						defaultValue={DEFAULT_LOCALE}
						className="form-control"
						onChange={handleLocaleChange}
					>
						{countries.map((country) => (
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
				{searchResults &&
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
