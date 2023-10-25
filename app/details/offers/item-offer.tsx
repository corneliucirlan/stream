import { OfferItem } from "@/utils/types"
import Image from "next/image"
import Link from "next/link"
import { getPhotoID } from "@/utils/photo"

const ItemOffer = ({ offer }: { offer: OfferItem }) => (
	<div className="stream-item d-inline-flex flex-column align-items-center justify-content-center">
		<div className="stream-logo">
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
			<p className="stream-name">{offer.package.clearName}</p>
		)}
		{offer.presentationTypes && (
			<p className="stream-resolutions">
				{offer.presentationTypes.join(" / ")}
			</p>
		)}
	</div>
)

export default ItemOffer
