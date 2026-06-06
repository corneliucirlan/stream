const getTraktUrl = async (imdbId: string, type: string) => {
	const BASE_URL = "https://api.trakt.tv"
	const headers = new Headers({
		"Content-Type": "application/json",
		"trakt-api-version": "2",
		"trakt-api-key": process.env.TRAKT_CLIENT_ID || ""
	})

	try {
		const response = await fetch(`${BASE_URL}/search/imdb/${imdbId}`, {
			method: "GET",
			headers
		})

		// Defensive: read as text first
		const text = await response.text()

		if (!text.trim()) {
			console.warn(`Trakt returned empty response for IMDb ID: ${imdbId}`)
			return null
		}

		let data: TraktSearchResult[]
		try {
			data = JSON.parse(text)
		} catch {
			console.error(
				`Failed to parse Trakt JSON for IMDb ID ${imdbId}:`,
				text
			)
			return null
		}

		const result = data[0]
		if (!result) return null

		const slug =
			type === "show" ? result.show?.ids.slug : result.movie?.ids.slug
		if (!slug) return null

		return `https://trakt.tv/${type}s/${slug}`
	} catch (err) {
		console.error(`Error fetching Trakt URL for IMDb ID ${imdbId}:`, err)
		return null
	}
}

type TraktSearchResult = {
	movie?: {
		ids: {
			slug: string
		}
	}
	show?: {
		ids: {
			slug: string
		}
	}
}

export default getTraktUrl
