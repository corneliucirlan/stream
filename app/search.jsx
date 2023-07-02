"use client"

import { useState, useEffect } from "react"
import { useSessionStorage } from "usehooks-ts"
import { DEFAULT_LOCALE, fetchData, mapResults } from "../utils/justwatch"
import { QUERY_KEY, LOCALE_KEY, RESULTS_KEY } from "./search/storage"

import Country from "./search/country"
import Query from "./search/query"
import Results from "./search/results"

export default ({ countries }) => {
	const [searchQuery] = useSessionStorage(QUERY_KEY)
	const [searchLocale] = useSessionStorage(LOCALE_KEY, DEFAULT_LOCALE)
	// const [searchResults, setSearchResults] = useSessionStorage(RESULTS_KEY)
	const [searchResults, setSearchResults] = useState()

	useEffect(() => {
		// Abort controller
		const controller = new AbortController()

		// Update search results
		if (searchQuery !== "" && searchQuery !== undefined)
			fetchData(searchQuery, searchLocale, controller.signal)
				.then(result => setSearchResults(mapResults(result)))
				.catch(error => console.log(error))
		else setSearchResults()

		// Abort fetch request if component ummounts
		return () => controller.abort()
	}, [searchQuery, searchLocale])

	return (
		<div className="container">
			<div className="row justify-content-center search-box">
				<Country countries={countries} />
				<Query />
			</div>

			<Results results={searchResults} locale={searchLocale} />
		</div>
	)
}
