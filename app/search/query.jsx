"use client"

import { QUERY_KEY } from "./storage"
import { useSessionStorage } from "usehooks-ts"

export default () => {
	const [query, setQuery] = useSessionStorage(QUERY_KEY, null)

	// Update session storage
	const handleChange = event => setQuery(event.target.value)

	return (
		<div className="col-12 col-md-4">
			<input
				type="text"
				className="form-control"
				onChange={handleChange}
				value={query !== null ? query : ""}
				placeholder="Search for a movie or tv show"
				autoFocus={true}
			/>
		</div>
	)
}
