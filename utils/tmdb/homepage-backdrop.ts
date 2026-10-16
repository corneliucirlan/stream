"use server"

import { createApiRequest } from "./tmdb-api"

type TmdbTrendingResult = {
	backdrop_path?: string | null
}

const homepageBackdrop = async (): Promise<string | null> => {
	const data = await createApiRequest<{ results: TmdbTrendingResult[] }>(
		"/trending/all/day"
	)

	return data?.results?.[0]?.backdrop_path ?? null
}

export default homepageBackdrop
