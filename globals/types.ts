export type SearchResult = {
	id: number
	title: string
	type: string
	poster: string
	year: string
}

export type Country = {
	english_name: string
	iso_3166_1: string
	native_name: string
}

export type WatchProvider = {
	display_priority: number
	logo_path: string
	provider_id: number
	provider_name: string
}

export type CountryProviders = {
	[type: string]: WatchProvider[]
}

export type RawOffers = {
	id: number
	results: CountryProviders[]
}

export type TitleDetails = {
	adult: boolean
	backdrop_path: string | null
	belongs_to_collection: {
		id: number
		name: string
		poster_path: string | null
		backdrop_path: string | null
	} | null
	budget: number
	genres: {
		id: number
		name: string
	}[]
	homepage: string | null
	id: number
	imdb_id: string | null
	origin_country: string[]
	original_language: string
	original_title: string
	overview: string | null
	popularity: number
	poster_path: string | null
	production_companies: {
		id: number
		logo_path: string | null
		name: string
		origin_country: string
	}[]
	production_countries: {
		iso_3166_1: string
		name: string
	}[]
	release_date: string
	revenue: number
	runtime: number | null
	spoken_languages: {
		english_name: string
		iso_639_1: string
		name: string
	}[]
	status: string
	tagline: string | null
	title?: string
	name?: string
	video: boolean
	vote_average: number
	vote_count: number
	number_of_seasons?: number
	first_air_date?: string
}

export type CastMember = {
	adult: boolean
	gender: number | null
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path: string | null
	cast_id: number
	character: string
	credit_id: string
	order: number
}

export type TitleCredits = {
	id: number
	cast: CastMember[]
}

export type ImagesObject = {
	[key: string]: Array<{
		aspect_ratio: number
		file_path: string
		height: number
		width: number
		iso_639_1: number | null
		vote_average: number
		vote_count: number
	}>
}
