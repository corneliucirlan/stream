"use client"

import { useSessionStorage } from "usehooks-ts"
import { QUERY_KEY } from "@/globals/vars"

const SearchQuery = () => {
	const [query, setQuery] = useSessionStorage<string>(QUERY_KEY, "")

	return (
		<div className="m-auto mt-20 w-1/2">
			<input
				type="text"
				className="focus:shadow-outline border-0` w-full rounded bg-white p-3 px-5 py-3 text-gray-700 outline-0 focus:outline-none"
				onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
					setQuery(event.target.value)
				}
				value={query}
				placeholder="Search for a movie or tv show"
				autoFocus={true}
			/>
		</div>
	)
}

export default SearchQuery
