"use client"

import { useState, useEffect } from "react"
import { useSessionStorage } from "usehooks-ts"
import { DEFAULT_LOCALE, LOCALE_KEY } from "@/utils/globals"
import { Country } from "@/utils/types"
import fetchCountries from "@/utils/fetch/fetch-countries"

// Get all streaming providers for a specific country
// https://apis.justwatch.com/content/providers/locale/en_US

const CountryComponent = () => {
	const [countries, setCountries] = useState<Country[]>()
	const [locale, setLocale] = useSessionStorage(LOCALE_KEY, DEFAULT_LOCALE)

	useEffect(() => {
		fetchCountries().then(countries => setCountries(countries))
	}, [])

	// Update session storage
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
		setLocale(event.target.value)

	return (
		<div className="col-12 col-md-2">
			<select
				value={locale}
				className="form-control"
				onChange={handleChange}
			>
				{countries?.map(country => (
					<option
						key={country.exposed_url_part}
						value={country.full_locale}
					>
						{country.country}
					</option>
				))}
			</select>
		</div>
	)
}

export default CountryComponent
