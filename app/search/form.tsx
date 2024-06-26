"use client"

import { Suspense, useEffect, useState } from "react"
import { useSessionStorage } from "usehooks-ts"
import { Country, SearchResult } from "@/utils/types"
import {
	QUERY_KEY,
	LOCALE_KEY,
	DEFAULT_LOCALE,
	RESULTS_KEY
} from "@/utils/globals"
import fetchData from "@/utils/fetch/fetch-query"
import Card from "./card"
import LoadingResults from "./loading-results"

const Form = ({ countries }: { countries: Array<Country> }) => {
	const [searchLocale, setSearchLocale] = useSessionStorage(
		LOCALE_KEY,
		DEFAULT_LOCALE
	)
	const [searchQuery, setSearchQuery] = useSessionStorage(QUERY_KEY, "")
	const [searchResults, setSearchResults] = useSessionStorage<
		SearchResult[] | undefined
	>(RESULTS_KEY, undefined)
	const [isLoading, setISLoading] = useState(false)

	useEffect(() => {
		// Reset search results
		if (searchQuery === "" || searchQuery === undefined)
			setSearchResults(undefined)
	}, [searchQuery, setSearchResults])

	const handleSubmit = (event: any) => {
		event.preventDefault()

		// Reset search results
		setSearchResults(undefined)

		// Update search results
		if (
			searchQuery !== undefined &&
			searchQuery !== "" &&
			searchLocale !== undefined
		) {
			console.log("search triggered")
			setISLoading(true)
			fetchData(searchQuery, searchLocale).then(result => {
				setSearchResults(result)
				setISLoading(false)
			})
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="mt-20 flex w-auto justify-center">
					<div className="m-5">
						<select
							value={searchLocale}
							className="shadow-outline w-full appearance-none rounded border px-5 py-3 leading-tight text-gray-700 shadow focus:outline-none"
							onChange={(
								event: React.ChangeEvent<HTMLSelectElement>
							) => setSearchLocale(event.target.value)}
						>
							{countries?.map(country => (
								<option
									key={country.exposed_url_part}
									value={country.full_locale}
								>
									{country.country}
								</option>
							))}
						</select>
					</div>

					<div className="m-5 w-1/3">
						<input
							type="text"
							className="focus:shadow-outline w-full appearance-none rounded border px-5 py-3 leading-tight text-gray-700 shadow focus:outline-none"
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							) => setSearchQuery(event.target.value)}
							value={searchQuery}
							placeholder="Search for a movie or tv show"
							autoFocus={true}
						/>
					</div>
				</div>
			</form>

			{isLoading && <LoadingResults />}

			{searchResults !== undefined && (
				<section className="mt-20 grid grid-cols-6 gap-8">
					<Suspense>
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
					</Suspense>
				</section>
			)}
		</>
	)
}

export default Form
