"use server"

import { SearchResult } from "@/globals/types"
import { createApiRequest } from "./tmdb-api"

type TmdbMovieSearchResult = {
	id: number
	media_type: "movie"
	title: string
	poster_path: string | null
	release_date?: string
}

type TmdbTvSearchResult = {
	id: number
	media_type: "tv"
	name: string
	poster_path: string | null
	first_air_date?: string
}

type TmdbPersonSearchResult = {
	id: number
	media_type: "person"
}

type TmdbSearchResult =
	| TmdbMovieSearchResult
	| TmdbTvSearchResult
	| TmdbPersonSearchResult

const isMediaSearchResult = (
	result: TmdbSearchResult
): result is TmdbMovieSearchResult | TmdbTvSearchResult => {
	return result.media_type === "movie" || result.media_type === "tv"
}

export const search = async (query: string): Promise<SearchResult[]> => {
	if (!query) return []

	const data = await createApiRequest<{ results: TmdbSearchResult[] }>(
		"/search/multi",
		{
			include_adult: "true",
			language: "en-US",
			query
		}
	)

	if (!data?.results) return []

	const filtered = data.results.filter(isMediaSearchResult)

	return filtered.map(r => ({
		id: r.id,
		title: r.media_type === "movie" ? r.title : r.name,
		type: r.media_type,
		poster: r.poster_path,
		year: r.media_type === "tv" ? r.first_air_date : r.release_date
	}))
}

export default search
