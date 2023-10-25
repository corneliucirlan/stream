const Loading = () => (
	<div className="container">
		<div className="row">
			<div className="col-12 col-md-3">
				<div className="skeleton skeleton-poster" />
			</div>

			<div className="col-12 col-md-9">
				<div className="skeleton skeleton-h1" />
				<div className="skeleton skeleton-h2" />

				{Array(3)
					.fill(0)
					.map((_, index) => (
						<div key={index} className="skeleton skeleton-p" />
					))}

				<div className="skeleton skeleton-h2" />
				<div className="row d-flex skeleton-container">
					{Array(5)
						.fill(0)
						.map((_, index) => (
							<div key={index} className="col-6 col-md-2">
								<div className="skeleton skeleton-inline" />
								<div className="skeleton skeleton-inline" />
							</div>
						))}
				</div>
			</div>
		</div>

		<div className="row offers-available">
			<div className="col-12 stream-country">
				<div className="skeleton skeleton-h2" />

				{Array(3)
					.fill(0)
					.map((_, index) => (
						<div key={index} className="stream-category">
							<div className="skeleton skeleton-h3" />
							{Array(5)
								.fill(0)
								.map((_, index) => (
									<div
										key={index}
										className="stream-item d-inline-flex flex-column align-items-center justify-content-center"
									>
										<div className="skeleton skeleton-icon" />
										<div className="skeleton skeleton-name" />
										<div className="skeleton skeleton-name" />
									</div>
								))}
						</div>
					))}
			</div>
		</div>
	</div>
)

export default Loading
