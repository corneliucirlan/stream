import { OfferItem } from "@/utils/types"
import Image from "next/image"
import Link from "next/link"
import { getPhotoID } from "@/utils/photo"

const ItemOffer = ({ offer }: { offer: OfferItem }) => (
	// <div className="stream-item d-inline-flex flex-column align-items-center justify-content-center">
	<div className="inline-flex max-w-24 flex-col items-center justify-items-center p-4 text-center">
		<div className="">
			<Link href={offer.standardWebURL} target="_blank">
				<Image
					src={`https://images.justwatch.com/icon/${getPhotoID(
						offer.package.icon
					)}/s100/${offer.package.technicalName}.webp`}
					width="50"
					height="50"
					alt={offer.package.clearName}
					style={{
						width: "50px",
						height: "50px",
						borderRadius: "25%"
					}}
				/>
			</Link>
		</div>
		{offer.package.clearName && (
			<p className="my-2">{offer.package.clearName}</p>
		)}
		{offer.presentationTypes && (
			<p className="text-xs uppercase text-white text-opacity-50">
				{offer.presentationTypes.join(" / ")}
			</p>
		)}
	</div>
)

export default ItemOffer
