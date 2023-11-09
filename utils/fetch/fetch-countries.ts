import { Country } from "@/utils/types"
import { JUSTWATCH_BASE_URL } from "@/utils/fetch/fetch-globals"

// Get a list of all available countries for streaming
const fetchCountries = async (): Promise<Country[]> => {
	// Get all available countries
	const countries = await (
		await fetch(`${JUSTWATCH_BASE_URL}/content/locales/state`)
	).json()

	// Return an alphabetically sorted list of countries
	return countries.sort((a: Country, b: Country) =>
		a.country > b.country ? 1 : -1
	)
}

export default fetchCountries
