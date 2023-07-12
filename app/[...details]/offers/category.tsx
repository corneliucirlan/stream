import ItemComponent from "./item"
import { Item, Offer } from "../../../utils/interface/offers"

export default ({ offerType, offers }: Offer) => {
	return (
		<article className="stream-category">
			<h3>{offerType}</h3>
			{offers?.map((offer: Item) => (
				<ItemComponent
					key={offer.providerName}
					icon={offer.icon}
					providerName={offer.providerName}
					resolutions={offer.resolutions}
				/>
			))}
		</article>
	)
}
