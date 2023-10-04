export interface SingleOfferForMovie {
	provider_id: number
	monetization_type: string
	presentation_type: string
}

export interface OffersForMovie {
	name: string
	offers: Array<SingleOfferForMovie>
}

export interface StreamProvider {
	clear_name: string
	icon_url: string
}

export interface MovieDetails {
	title: string
	poster: string
	backdrops: Array<number>
	slug: string
	object_type: string
	original_release_year: string
	short_description: string
	credits: Array<{
		person_id: number
		name: string
		character_name: string
	}>
	imdb: string
}
