import { Suspense } from "react"
import Card from "./card"
import LoadingResults from "./loading-results"
import SearchResult from "../../utils/interface/search-result"

export default ({
	results,
	locale,
}: {
	results: SearchResult[]
	locale: string
}) => (
	<Suspense fallback={<LoadingResults />}>
		<section className="row">
			{results?.map((result: SearchResult) => (
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
