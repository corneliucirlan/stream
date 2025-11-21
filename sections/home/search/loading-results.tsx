const LoadingResults = () => (
	<div className="absolute inset-0 grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
		{Array(10)
			.fill(0)
			.map((_, index) => (
				<div
					key={index}
					className="aspect-7/10 w-full animate-pulse rounded-md bg-white/15"
				>
					<div className="skeleton skeleton-card" />
				</div>
			))}
	</div>
)

export default LoadingResults
