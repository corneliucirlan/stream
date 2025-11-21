"use client"

import { useEffect, useState } from "react"
import { useSessionStorage } from "usehooks-ts"

import { QUERY_KEY, RESULTS_KEY } from "@/globals/vars"
import { SearchResult } from "@/globals/types"
import LoadingResults from "./search/loading-results"
import search from "@/utils/tmdb/search"
import Card from "./search/card"
import { baseURLImage } from "@/utils/tmdb/tmdb-api"

const DEBOUNCE_MS = 100 // 0.1 seconds debounce

const SearchResults = () => {
	const [searchQuery] = useSessionStorage<string | undefined>(
		QUERY_KEY,
		undefined
	)

	const [cached, setCached] = useSessionStorage<
		| {
				query: string
				results: SearchResult[]
		  }
		| undefined
	>(RESULTS_KEY, undefined)

	const [results, setResults] = useState<SearchResult[] | undefined>(
		undefined
	)
	const [isLoading, setIsLoading] = useState(false)
	const [mounted, setMounted] = useState(false)
	const [debouncedQuery, setDebouncedQuery] = useState<string | undefined>(
		searchQuery
	)

	// Mounting check
	useEffect(() => {
		setMounted(true)
	}, [])

	// Debounce input
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(searchQuery)
		}, DEBOUNCE_MS)

		return () => clearTimeout(handler)
	}, [searchQuery])

	useEffect(() => {
		if (!mounted || debouncedQuery === undefined) return

		let cancelled = false

		// Handle empty input
		if (debouncedQuery.trim() === "") {
			setResults(undefined)
			setCached(undefined)
			return
		}

		// Use cached results if they match the current query
		if (cached && cached.query === debouncedQuery) {
			setResults(cached.results)
			return
		}

		const doSearch = async () => {
			setIsLoading(true)

			const data = await search(debouncedQuery)

			if (!cancelled) {
				const finalResults = data ?? []
				setResults(finalResults)
				setCached({ query: debouncedQuery, results: finalResults })
				setIsLoading(false)
			}
		}

		doSearch()

		return () => {
			cancelled = true
		}
	}, [debouncedQuery, mounted])

	if (!mounted) return null

	return (
		<section className="relative mt-20 grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
			{results && results.length > 0
				? results.map(result => (
						<Card
							key={result.id}
							id={result.id}
							title={result.title}
							type={result.type}
							poster={`${baseURLImage}/${result.poster}`}
							year={result.year}
						/>
					))
				: !isLoading &&
					debouncedQuery?.trim() !== "" && (
						<div className="col-span-full mt-10 text-center text-gray-400">
							No results found for "{debouncedQuery}"
						</div>
					)}

			{/* Loading overlay */}
			{isLoading && (
				<div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
					<LoadingResults />
				</div>
			)}
		</section>
	)
}

export default SearchResults
