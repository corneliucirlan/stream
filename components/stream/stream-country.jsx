import StreamCategory from "./stream-category"

export default ({ provider }) => (
	<div className="col-12 stream-country">
		<div className="offers-country">
			<h2 className="title-country">{provider.country}</h2>

			{provider.offers.flatrate && (
				<StreamCategory
					title="Stream"
					offers={provider.offers.flatrate}
				/>
			)}
			{provider.offers.rent && (
				<StreamCategory
					title="Rent"
					offers={provider.offers.rent}
				/>
			)}
			{provider.offers.buy && (
				<StreamCategory
					title="Buy"
					offers={provider.offers.buy}
				/>
			)}
		</div>
	</div>
)
