import StreamItem from "./stream-item"

export default ({ title, offers }) => (
	<article className="stream-category">
		<h3>{title}</h3>

		{offers.map((offer) => (
			<StreamItem
				key={offer.id}
				logoURL={offer.icon}
				name={offer.name}
				resolutions={offer.resolutions}
			/>
		))}
	</article>
)
