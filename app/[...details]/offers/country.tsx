import Category from "./category"
import { OfferType } from "../../../utils/interface/offers"

export default ({
	countryName,
	offers
}: {
	countryName: string
	offers: OfferType[]
}) => {
	const categories: Array<string> = ["flatrate", "rent", "buy"]

	return (
		<div className="col-12 stream-country">
			<div className="offers-country">
				<h2 className="title-country">{countryName}</h2>
				{offers.map((offer: OfferType, index: number) => (
					<div key={index}>
						{categories.map(
							(category: string) =>
								category in offer && (
									<Category
										key={category}
										offerType={
											category === "flatrate"
												? "Stream"
												: category === "rent"
												? "Rent"
												: "Buy"
										}
										offers={offer[category]}
									/>
								)
						)}
					</div>
				))}
			</div>
		</div>
	)
}
