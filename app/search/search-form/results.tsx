import { SearchResult } from "@/utils/types"
import Card from "@/app/search/card"
import LoadingResults from "@/app/search/loading-results"

const SearchResults = ({
	isLoading,
	searchResults,
	searchLocale
}: {
	isLoading: boolean
	searchResults: SearchResult[] | undefined
	searchLocale: string
}) => {
	if (isLoading) {
		return <LoadingResults />
	}

	return (
		<section className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
			{searchResults?.map((result: SearchResult) => (
				<Card
					key={result.id}
					id={result.id}
					title={result.title}
					fullPath={result.fullPath}
					type={result.type}
					poster={result.poster}
					locale={searchLocale}
					releaseYear={result.releaseYear}
				/>
			))}
		</section>
	)
}

export default SearchResults
