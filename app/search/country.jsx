"use client"

import { useSessionStorage } from "usehooks-ts"
import { DEFAULT_LOCALE } from "../../utils/justwatch"
import { LOCALE_KEY } from "./storage"

export default ({ countries }) => {
	const [locale, setLocale] = useSessionStorage(LOCALE_KEY, DEFAULT_LOCALE)

	// Update session storage
	const handleChange = event => setLocale(event.target.value)

	return (
		<div className="col-12 col-md-2">
			<select
				defaultValue={locale}
				className="form-control"
				onChange={handleChange}
			>
				{countries !== null &&
					countries.map(country => (
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
