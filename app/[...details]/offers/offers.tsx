import {
	getAllProviders,
	getMovieData,
	getMovieProviders,
} from "../../../utils/justwatch"
import Country from "./country"

import { AllOffers } from "../../../utils/interface/offers"

export default async ({ id, type }: { id: string; type: string }) => {
	const allOffers: AllOffers = await getMovieData(id, type)

	return (
		<section className="row offers-available">
			{allOffers?.map(offer => (
				<Country
					key={offer.countryName}
					name={offer.countryName}
					offers={offer.offers}
				/>
			))}
		</section>
	)
}
