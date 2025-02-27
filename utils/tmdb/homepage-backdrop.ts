"use server"

import { createApiRequest } from "./tmdb-api"

export default async (): Promise<string | undefined> => {
	const data = await createApiRequest<{ results: any[] }>("/trending/all/day")

	if (!data || !data.results || data.results.length === 0) return undefined

	return data.results[0].backdrop_path
}
