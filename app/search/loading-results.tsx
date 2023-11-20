const LoadingResults = () => (
	<section className="row">
		{Array(18)
			.fill(0)
			.map((_, index) => (
				<div key={index} className="card col-6 col-md-2">
					<div className="skeleton skeleton-card" />
				</div>
			))}
	</section>
)

export default LoadingResults
