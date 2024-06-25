"use client"

import { QUERY_KEY } from "@/utils/globals"
import { useSessionStorage } from "usehooks-ts"

const Query = () => {
	const [query, setQuery] = useSessionStorage<string>(QUERY_KEY, "")

	// Update session storage
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setQuery(event.target.value)

	return (
		<div className="m-5 w-1/3">
			<input
				type="text"
				className="focus:shadow-outline w-full appearance-none rounded border px-5 py-3 leading-tight text-gray-700 shadow focus:outline-none"
				onChange={handleChange}
				value={query || ""}
				placeholder="Search for a movie or tv show"
				autoFocus={true}
			/>
		</div>
	)
}

export default Query
