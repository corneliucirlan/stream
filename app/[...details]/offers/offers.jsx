import { getMovieData } from "../../../utils/justwatch"
import Country from "./country"

export default async ({ id, type }) => {
	const allOffers = await getMovieData(id, type)

	return (
		<section className="row offers-available">
			{allOffers?.map(offer => (
				<Country
					key={offer.country}
					name={offer.country}
					offers={offer.offers}
				/>
			))}
		</section>
	)
}
