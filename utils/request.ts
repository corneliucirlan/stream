import { HEADERS } from "./js-old"

export default async <TResponse>(
	query: string,
	locale: string,
	controller: AbortController
): Promise<TResponse> => {
	const url = `/api/content/titles/${locale}/popular`

	// Fetch results
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			query: query,
		}),
		headers: HEADERS,
		signal: controller.signal,
	})

	// Return results as JSON object
	return (await response.json()) as TResponse
}
