import ItemComponent from "./item"
import { OfferItem } from "../../../utils/interface/offers"

export default ({
	offerType,
	offers
}: {
	offerType: string
	offers: OfferItem[]
}) => {
	return (
		<article className="stream-category">
			<h3>{offerType}</h3>
			{offers?.map((offer: OfferItem) => (
				<ItemComponent
					key={offer.id}
					icon={offer.icon}
					providerName={offer.providerName}
					resolutions={offer.resolutions}
				/>
			))}
		</article>
	)
}
