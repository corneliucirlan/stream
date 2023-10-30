export const JUSTWATCH_BASE_URL = "https://apis.justwatch.com"
export const JUSTWATCH_GRAPH_URL = `${JUSTWATCH_BASE_URL}/graphql`
export const JUSTWATCH_IMAGE_URL = "https://images.justwatch.com"

export const HEADERS = {
	"Content-Type": "application/json",
	"X-Requested-With": "fetch"
}

export const fetchOptions = {
	method: "POST",
	mode: "cors" as RequestMode,
	credentials: "omit" as RequestCredentials,
	headers: HEADERS
}
