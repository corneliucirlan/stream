import Image from "next/image"

export default ({ logoURL, name, resolutions }) => {
	return (
		<div className="stream-item d-inline-flex flex-column align-items-center justify-content-center">
			<div className="stream-logo">
				{logoURL && (
					<Image
						src={logoURL}
						width="50"
						height="50"
						alt={name}
						style={{
							width: "50px",
							height: "50px",
							borderRadius: "25%",
						}}
					/>
				)}
			</div>
			{name && <p className="stream-name">{name}</p>}
			{resolutions && (
				<p className="stream-resolutions">{resolutions.join(" / ")}</p>
			)}
		</div>
	)
}
