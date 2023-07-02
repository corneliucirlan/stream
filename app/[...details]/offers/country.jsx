import Category from "./category"

export default ({ name, offers }) => {
	const categories = ["flatrate", "rent", "buy"]

	return (
		<div className="col-12 stream-country">
			<div className="offers-country">
				<h2 className="title-country">{name}</h2>
				{categories.map(
					category =>
						category in offers && (
							<Category
								key={category}
								title={
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
