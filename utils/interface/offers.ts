export interface OfferItem {
	id?: number
	providerName: string
	icon: string | null
	resolutions: Array<string>
	type?: string
}

export interface OfferType {
	[key: string]: OfferItem[]
}

export interface Offer {
	countryName: string
	offers: OfferType[]
}
