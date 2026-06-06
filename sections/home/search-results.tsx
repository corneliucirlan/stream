"use client"

import { SearchResult } from "@/globals/types"
import Card from "./search/card"
import { baseURLImage } from "@/utils/tmdb/tmdb-api"

export default function SearchResults({
	results,
	query
}: {
	results: SearchResult[]
	query: string
}) {
	// Don't show "No results" if the user hasn't typed yet
	if (!query.trim()) return null

	// No results found
	if (!results.length) {
		return (
			<div className="col-span-full mt-10 text-center text-gray-400">
				No results found for &quot;{query}&quot;
			</div>
		)
	}

	return (
		<section className="relative mt-20 p-4">
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
				{results.map(result => (
					<Card
						key={result.id}
						id={result.id}
						title={result.title}
						type={result.type}
						poster={
							result.poster
								? `${baseURLImage}${result.poster}`
								: null
						}
						year={result.year}
					/>
				))}
			</div>
		</section>
	)
}
