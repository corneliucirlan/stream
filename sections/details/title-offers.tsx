import fetchOffersByTitle from "@/utils/fetch/fetch-offers"

import CountryOffers from "@/sections/details/offers/country-offers"

const Offers = async ({ id, type }: { id: number; type: string }) => {
	const offers = await fetchOffersByTitle(id, type)

	return (
		<div className="mt-20">
			{offers?.map(offer => (
				<CountryOffers key={offer.name} countryOffers={offer} />
			))}
		</div>
	)
}

export default Offers
