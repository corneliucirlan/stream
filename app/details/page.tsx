import { SearchParams } from "@/globals/types"
import ScrollToTop from "@/globals/components/scroll-top"

import TitleInfo from "@/sections/details/title-info"
import Offers from "@/sections/details/title-offers"

const DetailsPage = async ({
	searchParams
}: {
	searchParams: Promise<SearchParams>
}) => {
	const search = await searchParams

	return (
		<>
			<div className="container mx-4 mt-5 max-w-7xl text-white md:mx-auto md:mt-10">
				<TitleInfo
					type={search.type}
					locale={search.locale}
					fullPath={search.fullPath}
				/>

				<Offers id={search.id} type={search.type} />
			</div>
			<ScrollToTop />
		</>
	)
}

export default DetailsPage
