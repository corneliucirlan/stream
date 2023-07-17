import { getMovieData } from "../../../utils/justwatch"
import Country from "./country"

import { Offer } from "../../../utils/interface/offers"

export default async ({ id, type }: { id: number; type: string }) => {
	const allOffers: Offer[] = await getMovieData(id, type)

	return (
		<section className="row offers-available">
			{allOffers?.map((offer: Offer) => (
				<Country
					key={offer.countryName}
					countryName={offer.countryName}
					offers={offer.offers}
				/>
			))}
		</section>
	)
}
