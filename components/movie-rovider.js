import Image from "next/image";

export default ({ provider }) => (
	<article className="col-12 col-md-4" style={{ marginBottom: "10rem" }}>
		<h2>{provider.country}</h2>

		{provider.offers.flatrate && <h4>Stream</h4>}
		{provider.offers.flatrate &&
			provider.offers.flatrate.map((offer) => (
				<div key={offer.id} className="">
					{offer.icon && (
						<Image
							src={offer.icon}
							width="100"
							height="100"
							alt={offer.name}
							style={{objectFit: 'contain'}}
						/>
					)}
					<p key={offer.id}>{offer.name}</p>
				</div>
			))}

		{provider.offers.rent && <h4>Rent</h4>}
		{provider.offers.rent &&
			provider.offers.rent.map((offer) => (
				<div key={offer.id} className="">
					{offer.icon && (
						<Image
							src={offer.icon}
							width="100"
							height="100"
							alt={offer.name}
						/>
					)}
					<p key={offer.id}>{offer.name}</p>
				</div>
			))}

		{provider.offers.buy && <h4>Buy</h4>}
		{provider.offers.buy &&
			provider.offers.buy.map((offer) => (
				<div key={offer.id} className="">
					{offer.icon && (
						<Image
							src={offer.icon}
							width="100"
							height="100"
							alt={offer.name}
						/>
					)}
					<p key={offer.id}>{offer.name}</p>
				</div>
			))}
	</article>
);
