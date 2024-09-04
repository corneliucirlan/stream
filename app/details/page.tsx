import TitleDetails from "@/app/details/details"
import Loading from "@/app/details/loading"
import Offers from "@/app/details/offers"
import ScrollToTop from "@/components/scroll-top"
import { SearchParams } from "@/utils/types"

const DetailsPage = ({ searchParams }: { searchParams: SearchParams }) => {
	return (
		<>
			<div className="container mx-auto mt-10 max-w-7xl text-white">
				<TitleDetails
					type={searchParams.type}
					locale={searchParams.locale}
					fullPath={searchParams.fullPath}
				/>

				<Offers id={searchParams.id} type={searchParams.type} />
			</div>
			<ScrollToTop />
		</>
	)
}

export default DetailsPage
