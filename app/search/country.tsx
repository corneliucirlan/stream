"use client"

import { useEffect, useState } from "react"
import { useSessionStorage } from "usehooks-ts"
import { DEFAULT_LOCALE, API_BASE_URL } from "../../utils/justwatch"
import { LOCALE_KEY } from "./storage"

import Country from "../../utils/interface/country"

const fetchCountries = async () => {
	return (
		await (await fetch(`${API_BASE_URL}/content/locales/state`)).json()
	).sort((a, b) => (a.country > b.country ? 1 : -1))
}

export default () => {
	const [locale, setLocale] = useSessionStorage<string>(
		LOCALE_KEY,
		DEFAULT_LOCALE
	)

	const [countries, setCountries] = useState<Country[]>()

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
				{countries?.map((country: Country) => (
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
