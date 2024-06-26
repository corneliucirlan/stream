// 224 x 318

const LoadingResults = () => (
	<section className="mt-20 grid grid-cols-6 gap-10">
		{Array(18)
			.fill(0)
			.map((_, index) => (
				<div key={index} className="w-full aspect-7/10 rounded-md bg-white bg-opacity-10 animate-pulse">
					<div className="skeleton skeleton-card" />
				</div>
			))}
	</section>
)

export default LoadingResults
