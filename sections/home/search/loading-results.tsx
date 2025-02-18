const LoadingResults = () => (
	<section className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
		{Array(18)
			.fill(0)
			.map((_, index) => (
				<div
					key={index}
					className="aspect-7/10 w-full animate-pulse rounded-md bg-white bg-opacity-15"
				>
					<div className="skeleton skeleton-card" />
				</div>
			))}
	</section>
)

export default LoadingResults
