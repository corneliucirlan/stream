"use server"

import { createApiRequest } from "./tmdb-api"

type TmdbTrendingResult = {
	backdrop_path?: string | null
}

const homepageBackdrop = async (): Promise<string | undefined> => {
	const data = await createApiRequest<{ results: TmdbTrendingResult[] }>(
		"/trending/all/day"
	)

	return data?.results?.[0]?.backdrop_path ?? undefined
}

export default homepageBackdrop
