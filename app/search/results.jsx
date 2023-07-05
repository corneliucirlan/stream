import { Suspense } from "react"
import Card from "./card"
import LoadingResults from "./loading-results"

export default ({ results, locale }) => {
	return (
		// <LoadingResults />

		<Suspense fallback={<LoadingResults />}>
			<section className="row">
				{results?.map(result => (
					<Card
						key={result.id}
						id={result.id}
						title={result.title}
						type={result.type}
						poster={result.poster}
						locale={locale}
						releaseYear={result.releaseYear}
					/>
				))}
			</section>
		</Suspense>
	)
}
