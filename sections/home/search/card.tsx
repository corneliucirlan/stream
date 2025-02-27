import Link from "next/link"
import Image from "next/image"

import { SearchResult } from "@/globals/types"

const Card = ({ id, title, type, poster, year }: SearchResult) => {
	return (
		<article className="relative">
			<Link href={`/details/${type}/${id}`}>
				<div className={`skeleton`}>
					<Image src={poster} width="592" height="841" alt={title} />
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-black">
					<div className="absolute bottom-2 left-2 text-white">
						<h6 className="card-title">{title}</h6>
						<span className="card-details">
							{type.toUpperCase()} / {year?.slice(0, 4)}
						</span>
					</div>
				</div>
			</Link>
		</article>
	)
}

export default Card
