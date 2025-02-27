export const baseURL = "https://api.themoviedb.org/3"
export const baseURLImage = "https://image.tmdb.org/t/p/original"

export const createApiRequest = async <T>(
	endpoint: string,
	params?: Record<string, string>,
	method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
): Promise<T | undefined> => {
	try {
		const url = new URL(`${baseURL}${endpoint}`)
		url.searchParams.append("api_key", `${process.env.TMDB_API_KEY}`)
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				url.searchParams.append(key, value)
			})
		}

		const response = await fetch(url.toString(), {
			method,
			headers: {
				accept: "application/json"
			}
		})

		if (!response.ok) {
			console.error(
				`TMDB API error: ${response.status} ${response.statusText}`
			)
			return undefined
		}

		return await response.json()
	} catch (error) {
		console.error(`Error fetching TMDB API (${endpoint}):`, error)
		return undefined
	}
}
