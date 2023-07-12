"use client"

import { useState, useEffect } from "react"
import { useSessionStorage } from "usehooks-ts"
import { DEFAULT_LOCALE, fetchData, mapResults } from "../utils/justwatch"
import { QUERY_KEY, LOCALE_KEY, RESULTS_KEY } from "./search/storage"

import CountryComponent from "./search/country"
import Query from "./search/query"
import Results from "./search/results"

import request from "../utils/request"
import SearchResult from "../utils/interface/search-result"

export default () => {
	const [searchQuery] = useSessionStorage(QUERY_KEY, "")
	const [searchLocale] = useSessionStorage(LOCALE_KEY, DEFAULT_LOCALE)
	// const [searchResults, setSearchResults] = useSessionStorage(RESULTS_KEY)
	const [searchResults, setSearchResults] = useState<SearchResult[]>()

	useEffect(() => {
		// Abort controller
		const controller = new AbortController()

		// Update search results
		if (searchQuery !== "" && searchQuery !== undefined)
			request<SearchResult[]>(searchQuery, searchLocale, controller)
				.then(result => setSearchResults(mapResults(result)))
				.catch(error => console.log(error))
		else setSearchResults(undefined)

		// Abort fetch request if component ummounts
		return () => controller.abort()
	}, [searchQuery, searchLocale])

	return (
		<div className="container">
			<div className="row justify-content-center search-box">
				<CountryComponent />
				<Query />
			</div>

			{searchResults && (
				<Results results={searchResults} locale={searchLocale} />
			)}
		</div>
	)
}
