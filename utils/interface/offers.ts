export interface Item {
	icon: string
	providerName: string
	resolutions: Array<string>
}

export interface Offer {
	offerType: string
	offers: Array<Item>
	// offers: {
	// 	[key: string]: Array<Item>
	// }
}

export interface AllOffers {
	countryName: string
	offers: {
		flatrate?: Offer
		rent?: Offer
		buy?: Offer
	}
}
