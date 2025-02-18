const LocaleSelect: React.FC<{
	countries: Array<{
		country: string
		full_locale: string
		exposed_url_part: string
	}>
	searchLocale: string
	setSearchLocale: (locale: string) => void
}> = ({ countries, searchLocale, setSearchLocale }) => {
	return (
		<select
			value={searchLocale}
			className="shadow-outline w-full appearance-none rounded border px-5 py-3 leading-tight text-gray-700 shadow focus:outline-none"
			onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
				setSearchLocale(event.target.value)
			}
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
	)
}

export default LocaleSelect
