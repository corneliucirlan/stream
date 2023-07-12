import Category from "./category"
import { Item, Offer } from "../../../utils/interface/offers"

// interface Offers {
// 	providerName: string
// 	offers: {
// 		[key: string]: Array<Item>
// 	}
// }

export default ({ countryName, offers }: Offer) => {
	const categories: Array<string> = ["flatrate", "rent", "buy"]
	console.log(offers)
	return (
		<div className="col-12 stream-country">
			<div className="offers-country">
				<h2 className="title-country">{countryName}</h2>
				{categories?.map(
					(category: string) =>
						category in offers && (
							<Category
								key={category}
								providerName={
									category === "flatrate"
										? "Stream"
										: category === "rent"
										? "Rent"
										: "Buy"
								}
								offers={offers[category]}
							/>
						)
				)}
			</div>
		</div>
	)
}
