const getTraktUrl = async (imdbId: string, type: string) => {
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

    if (!result) {
        return null // IMDb ID not found on Trakt.tv
    }

    const slug = type === "show" ? result.show.ids.slug : result.movie.ids.slug

    // Construct the Trakt.tv URL
    const traktUrl = `https://trakt.tv/${type}s/${slug}`

    return traktUrl
}

export default getTraktUrl