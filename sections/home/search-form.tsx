"use client"

import { useEffect, useState } from "react"
import { useSessionStorage } from "usehooks-ts"

import {
	QUERY_KEY,
	LOCALE_KEY,
	DEFAULT_LOCALE,
	RESULTS_KEY
} from "@/globals/vars"
import { Country, SearchResult } from "@/globals/types"
import fetchData from "@/utils/fetch/fetch-query"

import LocaleSelect from "@/sections/home/search-form/locale"
import SearchInput from "@/sections/home/search-form/input"
import SearchResults from "@/sections/home/search-form/results"

const SearchForm = ({ countries }: { countries: Array<Country> }) => {
	const [searchLocale, setSearchLocale] = useSessionStorage(
		LOCALE_KEY,
		DEFAULT_LOCALE
	)
	const [searchQuery, setSearchQuery] = useSessionStorage(QUERY_KEY, "")
	const [searchResults, setSearchResults] = useSessionStorage<
		SearchResult[] | undefined
	>(RESULTS_KEY, undefined)
	const [isLoading, setIsLoading] = useState(false)

	// Reset search results
	useEffect(() => {
		if (!searchQuery) setSearchResults(undefined)
	}, [searchQuery, setSearchResults])

	const handleSubmit = async (event: any) => {
		event.preventDefault()

		// Reset search results
		setSearchResults(undefined)

		// Check if both searchQuery and searchLocale are defined
		if (searchQuery && searchLocale) {
			setIsLoading(true)
			try {
				// Fetch data using the provided searchQuery and searchLocale & update search results
				setSearchResults(await fetchData(searchQuery, searchLocale))
			} catch (error) {
				console.error("Error fetching data:", error)
			} finally {
				setIsLoading(false)
			}
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="mt-20 flex w-auto flex-col justify-center sm:flex-row">
					<div className="m-5">
						<LocaleSelect
							countries={countries}
							searchLocale={searchLocale}
							setSearchLocale={setSearchLocale}
						/>
					</div>

					<div className="m-5 sm:w-auto md:w-1/3">
						<SearchInput
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
						/>
					</div>
				</div>
			</form>

			<SearchResults
				isLoading={isLoading}
				searchResults={searchResults}
				searchLocale={searchLocale}
			/>
		</>
	)
}

export default SearchForm
