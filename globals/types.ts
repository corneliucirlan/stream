/**
 * TYPE DEFINITIONS FOR TMDB MEDIA & WATCH PROVIDERS
 */

// --- Shared Utility Types ---

export type MediaType = "movie" | "tv"

export type AvailabilityType = "flatrate" | "rent" | "buy" | "ads" | "free"

export interface SearchResult {
	id: number
	title: string
	type: MediaType
	poster: string
	year: string
}

export interface Country {
	english_name: string
	iso_3166_1: string
	native_name: string
}

// --- Watch Provider Types ---

export interface WatchProvider {
	display_priority: number
	logo_path: string
	provider_id: number
	provider_name: string
}

export interface CountryProviders {
	[type: string]: WatchProvider[]
}

export interface CountryAvailability {
	link: string
	flatrate?: WatchProvider[]
	rent?: WatchProvider[]
	buy?: WatchProvider[]
	ads?: WatchProvider[]
}

export type RawOffers = {
	id: number
	results: Record<string, CountryAvailability> // Key is ISO country code (e.g., 'US')
}

export interface SeasonAvailability {
	season_name: string
	season_number: number
	providers: WatchProvider[]
	// providers: Omit<CountryAvailability, "link"> | null
}

// --- Credits & Images ---

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

export type ImageAsset = {
	aspect_ratio: number
	file_path: string
	height: number
	width: number
	iso_639_1: string | null
	vote_average: number
	vote_count: number
}

export type ImagesObject = Record<string, ImageAsset[]>

// --- Base Media Interface ---

export interface BaseMediaDetails {
	adult: boolean
	backdrop_path: string | null
	genres: { id: number; name: string }[]
	homepage: string | null
	id: number
	origin_country: string[]
	original_language: string
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
	spoken_languages: {
		english_name: string
		iso_639_1: string
		name: string
	}[]
	status: string
	tagline: string | null
	vote_average: number
	vote_count: number
	external_ids?: Record<string, string | number | null | undefined>
	credits?: {
		cast: CastMember[]
	}
}

// --- Specific Media Types ---

export interface TVSeason {
	season_number: number
	name: string
	air_date?: string
	episode_count?: number
	id?: number
	poster_path?: string | null
}

export interface TVShowDetails extends BaseMediaDetails {
	name: string
	original_name: string
	first_air_date: string
	last_air_date?: string
	number_of_seasons: number
	number_of_episodes?: number
	seasons: TVSeason[]
}

export interface MovieDetails extends BaseMediaDetails {
	title: string
	original_title: string
	release_date: string
	revenue: number
	runtime: number | null
	budget: number
	belongs_to_collection: {
		id: number
		name: string
		poster_path: string | null
		backdrop_path: string | null
	} | null
	video: boolean
	imdb_id: string | null
}

/**
 * Combined type for handling both Movies and TV shows in shared components
 */
export type TitleDetails = MovieDetails & TVShowDetails

// --- Component Prop Interfaces ---

export interface ProviderProps {
	watch: WatchProvider
	availableSeasons?: number[]
}

export interface CategoryProvidersProps {
	type: AvailabilityType | string
	category: WatchProvider[]
	seasons: SeasonAvailability[]
}

export interface SeasonWatchProviders {
	id: number
	results: Record<string, CountryAvailability>
}
