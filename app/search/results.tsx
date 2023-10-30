"use client"

import { useEffect, useState } from "react"
import { useSessionStorage } from "usehooks-ts"
import { QUERY_KEY, LOCALE_KEY, DEFAULT_LOCALE } from "@/utils/globals"
import fetchData from "@/utils/fetch/fetch-query"
import { SearchResult } from "@/utils/types"
import Card from "./card"

const SearchResults = () => {
	const [searchQuery] = useSessionStorage(QUERY_KEY, undefined)
	const [searchLocale] = useSessionStorage(LOCALE_KEY, DEFAULT_LOCALE)
	const [searchResults, setSearchResults] = useState<
		SearchResult[] | undefined
	>(undefined)

	useEffect(() => {
		// Abort controller
		const controller = new AbortController()

		// Reset search results
		if (searchQuery === "" || searchQuery === undefined)
			setSearchResults(undefined)

		// Update search results
		if (
			searchQuery !== undefined &&
			searchQuery !== "" &&
			searchLocale !== undefined
		) {
			fetchData(searchQuery, searchLocale, controller).then(result =>
				setSearchResults(result)
			)
		}

		// Abort fetch request if component ummounts
		return () => controller.abort()
	}, [searchQuery, searchLocale])

	return (
		<section className="row">
			{searchResults?.map((result: SearchResult) => (
				<Card
					key={result.id}
					id={result.id}
					title={result.title}
					fullPath={result.fullPath}
					type={result.type}
					poster={result.poster}
					locale={searchLocale}
					releaseYear={result.releaseYear}
				/>
			))}
		</section>
	)
}

export default SearchResults
