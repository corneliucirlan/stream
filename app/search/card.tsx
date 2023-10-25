import Link from "next/link"
import Image from "next/image"
import { SearchResult } from "@/utils/types"

const Card = ({
	id,
	title,
	type,
	fullPath,
	poster,
	locale,
	releaseYear
}: SearchResult) => {
	return (
		<article className="col-6 col-md-2 card">
			<Link
				href={{
					pathname: "/details",
					query: {
						fullPath: fullPath,
						id: id,
						type: type,
						locale: locale
					}
				}}
			>
				<div className={`skeleton`}>
					<Image src={poster} width="592" height="841" alt={title} />
				</div>
				<div className="card-background">
					<div className="card-copy">
						<h6 className="card-title">{title}</h6>
						<span className="card-details">
							{type} / {releaseYear}
						</span>
					</div>
				</div>
			</Link>
		</article>
	)
}

export default Card
