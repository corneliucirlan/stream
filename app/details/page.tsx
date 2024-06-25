import TitleDetails from "./details"
import Loading from "./loading"
import Offers from "./offers"
import { SearchParams } from "@/utils/types"

const DetailsPage = ({ searchParams }: { searchParams: SearchParams }) => {
	return (
		// <Loading />
		<div className="container mx-auto mt-10 max-w-7xl text-white">
			<TitleDetails
				type={searchParams.type}
				locale={searchParams.locale}
				fullPath={searchParams.fullPath}
			/>

			<Offers id={searchParams.id} type={searchParams.type} />
		</div>
	)
}

export default DetailsPage
