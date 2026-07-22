"use client"

import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill"
import { useEffect } from "react"

export default function CountryFlagPolyfill() {
	useEffect(() => {
		polyfillCountryFlagEmojis()
	}, [])

	return null
}
