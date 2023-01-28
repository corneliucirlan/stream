import Image from "next/image"

export default ({ title, offers }) => (
	<article className="offers-category">
		<h3>{title}</h3>
		{offers.map((offer) => (
			<div
				key={offer.id}
				className="offer-provider d-inline-flex flex-column align-items-center justify-content-center"
			>
				<div className="offer-provider-logo">
					{offer.icon && (
						<Image
							src={offer.icon}
							width="50"
							height="50"
							alt={offer.name}
							style={{ width: "50px", height: "50px", borderRadius: '25%' }}
						/>
					)}
				</div>
				<p className="offer-provider-name">{offer.name}</p>
				<p className="offer-provider-resolutions">
					{offer.resolutions.join(" / ")}
				</p>
			</div>
		))}
	</article>
);

