"use server"

import { createApiRequest } from "./tmdb-api"

export default async (): Promise<string | undefined> => {
	const data = await createApiRequest<{ results: any[] }>("/trending/all/day")

	return data?.results?.[0]?.backdrop_path
}
