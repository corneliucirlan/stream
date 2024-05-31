"use client"

import { useSessionStorage } from "usehooks-ts"
import { DEFAULT_LOCALE, LOCALE_KEY } from "@/utils/globals"
import { Country } from "@/utils/types"

// Get all streaming providers for a specific country
// https://apis.justwatch.com/content/providers/locale/en_US

const CountryComponent = ({ countries }: { countries: Country[] }) => {
	const [locale, setLocale] = useSessionStorage(LOCALE_KEY, DEFAULT_LOCALE)

	// Update session storage
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
		setLocale(event.target.value)

	return (
		<div className="m-5 w-auto">
			<select
				value={locale}
				className="focus:shadow-outline w-full appearance-none rounded border px-5 py-3 leading-tight text-gray-700 shadow focus:outline-none"
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
