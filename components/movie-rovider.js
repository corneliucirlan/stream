import OfferCategory from "./offer-category"

export default ({ provider }) => (
	<div className="col-12 offers-country-container">
		<div className="offers-country">
			<h2 className="title-country">{provider.country}</h2>

			{provider.offers.flatrate && (
				<OfferCategory
					title="Stream"
					offers={provider.offers.flatrate}
				/>
			)}
			{provider.offers.rent && (
				<OfferCategory
					title="Rent"
					offers={provider.offers.rent}
				/>
			)}
			{provider.offers.buy && (
				<OfferCategory
					title="Buy"
					offers={provider.offers.buy}
				/>
			)}
		</div>
	</div>
)
