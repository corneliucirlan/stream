"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import SearchQuery from "@/sections/home/search-query"
import SearchResults from "@/sections/home/search-results"
import LoadingResults from "@/sections/home/search/loading-results"
import { SearchResult } from "@/globals/types"

const STORAGE_KEY = "movieSearch"

export default function Home() {
	const [query, setQuery] = useState("")
	const [results, setResults] = useState<SearchResult[]>([])
	const [loading, setLoading] = useState(false)
	const [hydrated, setHydrated] = useState(false)
	const abortControllerRef = useRef<AbortController | null>(null)

	// Load saved search from sessionStorage
	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			const saved = sessionStorage.getItem(STORAGE_KEY)
			if (saved) {
				const { query: savedQuery, results: savedResults } =
					JSON.parse(saved)
				setQuery(savedQuery)
				setResults(savedResults)
			}
			setHydrated(true)
		}, 0)

		return () => window.clearTimeout(timeoutId)
	}, [])

	const fetchResults = useCallback(
		async (q: string) => {
			if (!hydrated) return

			// If query is the same as current, don't set loading
			const isSameQuery = q === query
			setQuery(q)

			if (!q.trim()) {
				setResults([])
				setLoading(false)
				sessionStorage.removeItem(STORAGE_KEY)
				return
			}

			if (abortControllerRef.current) {
				abortControllerRef.current.abort()
			}

			const controller = new AbortController()
			abortControllerRef.current = controller

			if (!isSameQuery) setLoading(true)

			try {
				const res = await fetch(
					`/api/search?q=${encodeURIComponent(q)}`,
					{
						signal: controller.signal
					}
				)
				if (!res.ok) throw new Error("Fetch failed")

				const data = await res.json()
				setResults(data)

				// Save only after successful fetch
				sessionStorage.setItem(
					STORAGE_KEY,
					JSON.stringify({ query: q, results: data })
				)
			} catch (err) {
				if (err instanceof DOMException && err.name === "AbortError")
					return
				console.error(err)
			} finally {
				if (!isSameQuery) setLoading(false)
			}
		},
		[hydrated, query]
	)

	return (
		<div className="container mx-auto max-w-7xl">
			{hydrated && (
				<SearchQuery onSearch={fetchResults} initialValue={query} />
			)}
			{!loading && hydrated && (
				<SearchResults results={results} query={query} />
			)}
			{loading && <LoadingResults />}
		</div>
	)
}
