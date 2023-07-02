import Item from "./item"

export default ({ title, offers }) => {
	return (
		<article className="stream-category">
			<h3>{title}</h3>
			{offers.map(offer => (
				<Item
					key={offer.id}
					logoURL={offer.icon}
					name={offer.name}
					resolutions={offer.resolutions}
				/>
			))}
		</article>
	)
}
