"use server"

import { SearchResult } from "@/globals/types"
import { createApiRequest } from "./tmdb-api"

let latestQuery = ""

export default async (query: string): Promise<SearchResult[] | undefined> => {
	if (!query) return []

	latestQuery = query

	const data = await createApiRequest<{ results: any[] }>("/search/multi", {
		include_adult: "true",
		language: "en-US",
		query: query
	})

	if (latestQuery !== query) {
		console.log("Outdated request, ignoring results")
		return undefined
	}

	if (!data || !data.results) return undefined

	return data.results.map((result: any) => ({
		id: result.id,
		title: result.media_type === "movie" ? result.title : result.name,
		type: result.media_type,
		poster:
			result.media_type === "person"
				? result.profile_path
				: result.poster_path,
		year:
			result.media_type === "tv"
				? result.first_air_date
				: result.release_date
	}))
}
