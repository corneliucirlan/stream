export const JUSTWATCH_BASE_URL = "https://apis.justwatch.com"
export const JUSTWATCH_GRAPH_URL = `${JUSTWATCH_BASE_URL}/graphql`
export const JUSTWATCH_IMAGE_URL = "https://images.justwatch.com"

export const HEADERS = {
	accept: "*/*",
	"X-Requested-With": "fetch",
	"content-type": "application/json"
	// "accept-language": "en-US,en;q=0.9",
	// "app-version": "3.8.0-web",
	// "device-id": "rsRIG2n_Ee6cUfrEg3aSzA",
	// "sec-ch-ua":
	// 	'"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
	// "sec-ch-ua-mobile": "?0",
	// "sec-ch-ua-platform": '"Windows"',
	// "sec-fetch-dest": "empty",
	// "sec-fetch-mode": "cors",
	// "sec-fetch-site": "same-site"
}

export const fetchOptions = {
	method: "POST",
	mode: "cors" as RequestMode,
	credentials: "omit" as RequestCredentials,
	// referrer: "https://www.justwatch.com/",
	// referrerPolicy: "strict-origin-when-cross-origin",
	headers: HEADERS
}
