import fetchOffersByTitle from "@/utils/fetch/fetch-offers"
import CountryOffers from "./offers/country-offers"

const Offers = async ({ id, type }: { id: number; type: string }) => {
	const offers = await fetchOffersByTitle(id, type)

	return (
		<div className="row offers-available">
			{offers?.map(offer => (
				<CountryOffers key={offer.name} countryOffers={offer} />
			))}
		</div>
	)
}

export default Offers
