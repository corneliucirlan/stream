const getTraktUrl = async (imdbId: string, type: string): Promise<URL> => {
	const BASE_URL = "https://api.trakt.tv"
	const headers = new Headers({
		"Content-Type": "application/json",
		"trakt-api-version": "2",
		"trakt-api-key": process.env.TRAKT_CLIENT_ID || ""
	})
	const response = await fetch(`${BASE_URL}/search/imdb/${imdbId}`, {
		method: "GET",
		headers
	})
	const data = await response.json()

	// Assuming the first result is the most relevant
	const result = data[0]

	// IMDb ID not found on Trakt.tv
	if (!result) return new URL("https://trakt.tv")

	const slug =
		type === "show" ? result?.show?.ids?.slug : result?.movie?.ids?.slug

	// Construct the Trakt.tv URL
	const traktUrl: URL = new URL(`https://trakt.tv/${type}s/${slug}`)

	// Return Trakt.tv link
	return traktUrl
}

export default getTraktUrl
