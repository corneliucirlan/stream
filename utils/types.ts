export type BackdropType = {
	id: number | null
	slug: string
}

export type SearchResult = {
	id: number
	title: string
	fullPath: string
	type: string
	poster: string
	locale: string
	releaseYear: number
}

export type Country = {
	exposed_url_part: string
	full_locale: string
	country: string
}

export type Details = {
	title: string
	poster: string
	seasons?: number
	releaseYear: number
	description: string
	credits: Array<{
		name: string
		characterName: string
	}>
	backdrops: number[]
	slug: string
	imdb: string
}

export type SearchParams = {
	id: number
	type: string
	locale: string
	fullPath: string
}

export type OfferItem = {
	id: string
	type: string
	package: {
		id: string
		packageId: number
		clearName: string
		technicalName: string
		icon: string
	}
	standardWebURL: string
	elementCount: number
	presentationType?: string
	presentationTypes: string[]
}

export type OfferCategory = {
	name: string
	offers: Array<OfferItem>
}

export type OfferCountry = {
	name: string
	locale: string
	offers: Array<OfferCategory>
}
