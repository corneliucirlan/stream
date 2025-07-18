"use server"

import { createApiRequest } from "./tmdb-api"

const homepageBackdrop = async (): Promise<string | undefined> => {
	const data = await createApiRequest<{ results: any[] }>("/trending/all/day")

	return data?.results?.[0]?.backdrop_path
}

export default homepageBackdrop
