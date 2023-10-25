import { OfferCategory, OfferCountry } from "@/utils/types"
import CategoryOffers from "./category-offers"

const CountryOffers = ({ countryOffers }: { countryOffers: OfferCountry }) => (
	<div className="col-12 stream-country">
		<div className="offers-country">
			<h2 className="title-country">{countryOffers.name}</h2>
			{countryOffers?.offers?.map((countryOffer: OfferCategory) => (
				<CategoryOffers
					key={countryOffer.name}
					categoryOffers={countryOffer}
				/>
			))}
		</div>
	</div>
)

export default CountryOffers
