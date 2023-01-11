import { useEffect, useState } from "react"

import MovieCard from "../components/movie-card"
import { getPhotoID, searchQuery, getAllCountries, getAllAvailableProviders } from "../utils/justwatch"

// Get list of all countries
export const getStaticProps = async () => ({ props: { countries: await getAllCountries() } })

export default ({ countries }) => {
	
	// Store search locale / country
	let [ searchLocale, setSearchLocale ] = useState('en_US')

	// Store search box state
	let [ searchInput, setSearchInput ] = useState('')

	// Store search results
	let [ searchResults, setSearchResults ] = useState([])

	useEffect(() => {

		// Search Movie or TV Show
		searchInput && searchQuery(searchInput, searchLocale).then(response => {

			const items = response.items.map(item => {
				return ({
					id: item.id,
					title: item.title,
					poster: `https://images.justwatch.com/poster/${getPhotoID(item.poster)}/s592/poster.webp`,
					type: item.object_type,
					releasseYear: item.original_release_year
				})
			})

			setSearchResults(items)
		})

	}, [ searchInput ])

	// Save search country
	const handleLocaleChange = event => setSearchLocale(event.target.value)

	useEffect(() =>{
		console.log("LOCALE: ", searchLocale)
	}, [searchLocale])

	// Save search input
	const handleSearchChange = event => setSearchInput(event.target.value)

	return (
		<div className="container">
			<div className="row justify-content-center search-box">
				<div className="col col-md-3">
					<select
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

				<div className="col col-md-6">
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
						/>
					))}
			</div>
		</div>
	);
}
