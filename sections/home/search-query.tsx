"use client"

import { useState, useEffect, useRef } from "react"

const DEBOUNCE_MS = 150

export default function SearchQuery({
	onSearch,
	initialValue = ""
}: {
	onSearch: (query: string) => void
	initialValue?: string
}) {
	const [value, setValue] = useState(initialValue)
	const firstRender = useRef(true)

	useEffect(() => {
		// Skip initial search triggered by hydration
		if (firstRender.current) {
			firstRender.current = false
			return
		}

		const handler = setTimeout(() => {
			onSearch(value)
		}, DEBOUNCE_MS)

		return () => clearTimeout(handler)
	}, [value, onSearch])

	return (
		<div className="m-auto mt-20 w-1/2">
			<input
				type="text"
				className="w-full rounded bg-white p-3 px-5 py-3 text-gray-700 outline-none"
				onChange={e => setValue(e.target.value)}
				value={value}
				placeholder="Search for a movie or TV show"
				autoFocus
			/>
		</div>
	)
}
