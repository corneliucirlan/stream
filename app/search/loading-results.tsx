export default () => {
	return (
		<div className="row">
			{Array(30)
				.fill(0)
				.map((_, index) => (
					<div
						key={index}
						className="col-6 col-md-2 card"
						style={{
							width: "16.66%",
							height: "300px",
						}}
					>
						<div
							className="skeleton"
							style={{
								width: "100%",
								height: "100%",
							}}
						></div>
					</div>
				))}
		</div>
	)
}
