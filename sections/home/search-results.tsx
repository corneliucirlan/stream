"use client"

import { useEffect, useState } from "react"
import { useSessionStorage } from "usehooks-ts"

import { QUERY_KEY, RESULTS_KEY } from "@/globals/vars"
import { SearchResult } from "@/globals/types"
import LoadingResults from "./search/loading-results"
import search from "@/utils/tmdb/search"
import Card from "./search/card"
import { baseURLImage } from "@/utils/tmdb/tmdb-api"

const SearchResults = () => {
	const [searchQuery] = useSessionStorage(QUERY_KEY, undefined)
	const [searchResults, setSearchResults] = useSessionStorage<
		SearchResult[] | undefined
	>(RESULTS_KEY, undefined)
	const [isLoading, setISLoading] = useState(false)
	const [hasMounted, setHasMounted] = useState(false)

	useEffect(() => {
		// Set to true after the initial render
		setHasMounted(true)

		if (!searchQuery) {
			setSearchResults(undefined)
			return
		}

		if (searchQuery !== undefined && searchQuery !== "") {
			setISLoading(true)
			search(searchQuery) // Pass the signal to the search function
				.then(result => {
					if (result) {
						setSearchResults(result)
						setISLoading(false)
					}
				})
		}
	}, [searchQuery, setSearchResults])

	if (!hasMounted) return

	if (!searchResults && isLoading === true) {
		return <LoadingResults />
	}

	if (!searchResults) {
		return (
			<section className="mt-20 grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5"></section>
		)
	}

	return (
		<section className="mt-20 grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
			{searchResults.map((result: SearchResult) => (
				<Card
					key={result.id}
					id={result.id}
					title={result.title}
					type={result.type}
					poster={`${baseURLImage}/${result.poster}`}
					year={result.year}
				/>
			))}
		</section>
	)
}

export default SearchResults
