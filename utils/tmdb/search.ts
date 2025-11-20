"use server"

import { SearchResult } from "@/globals/types"
import { createApiRequest } from "./tmdb-api"

export const search = async (query: string): Promise<SearchResult[]> => {
	if (!query) return []

	const data = await createApiRequest<{ results: any[] }>("/search/multi", {
		include_adult: "true",
		language: "en-US",
		query
	})

	if (!data?.results) return []

	const filtered = data.results.filter(r => r.media_type !== "person")

	return filtered.map((r: any) => ({
		id: r.id,
		title: r.media_type === "movie" ? r.title : r.name,
		type: r.media_type,
		poster: r.poster_path,
		year: r.media_type === "tv" ? r.first_air_date : r.release_date
	}))
}

export default search
