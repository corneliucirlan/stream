import ItemOffer from "./item-offer"
import { OfferCategory, OfferItem } from "@/utils/types"

const CategoryOffers = ({
	categoryOffers
}: {
	categoryOffers: OfferCategory
}) => (
	<article className="">
		<h3 className="mt-2 text-h3">{categoryOffers.name}</h3>
		{categoryOffers.offers?.map((categoryOffer: OfferItem) => (
			<ItemOffer key={categoryOffer.id} offer={categoryOffer} />
		))}
	</article>
)

export default CategoryOffers
