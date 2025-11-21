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
		let isCancelled = false
		setHasMounted(true)

		if (searchQuery === undefined) return

		// handle empty string
		if (searchQuery === "") {
			setSearchResults(undefined)
			setISLoading(false)
			return
		}

		// ✅ If results already exist in sessionStorage, DO NOT re-search
		if (searchResults && searchResults.length > 0) return

		const doSearch = async () => {
			setISLoading(true)

			const result = await search(searchQuery)

			if (!isCancelled) {
				setSearchResults(result || [])
				setISLoading(false)
			}
		}

		doSearch()

		return () => {
			isCancelled = true
		}
	}, [searchQuery])

	if (!hasMounted) return null

	if (isLoading && searchResults === undefined) return <LoadingResults />

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
