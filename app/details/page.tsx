import TitleDetails from "./details"
import Offers from "./offers"
import { SearchParams } from "@/utils/types"

const DetailsPage = ({ searchParams }: { searchParams: SearchParams }) => {
	return (
		<div className="container">
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
