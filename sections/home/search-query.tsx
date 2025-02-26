"use client"

import { useSessionStorage } from "usehooks-ts"
import { QUERY_KEY } from "@/globals/vars"

export default () => {
	const [query, setQuery] = useSessionStorage<string>(QUERY_KEY, "")

	return (
		<div className="mt-20 flex w-auto flex-col justify-center sm:flex-row">
			<input
				type="text"
				className="focus:shadow-outline w-full appearance-none rounded border px-5 py-3 leading-tight text-gray-700 shadow focus:outline-none"
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
