import Image from "next/image"
import { OfferItem } from "../../../utils/interface/offers"

export default ({ icon, providerName, resolutions }: OfferItem) => {
	return (
		<div className="stream-item d-inline-flex flex-column align-items-center justify-content-center">
			<div className="stream-logo">
				{icon && (
					<Image
						src={icon}
						width="50"
						height="50"
						alt={providerName}
						style={{
							width: "50px",
							height: "50px",
							borderRadius: "25%"
						}}
					/>
				)}
			</div>
			{providerName && <p className="stream-name">{providerName}</p>}
			{resolutions && (
				<p className="stream-resolutions">{resolutions.join(" / ")}</p>
			)}
		</div>
	)
}
