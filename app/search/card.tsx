"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import SearchResult from "../../utils/interface/search-result"

export default ({
	id,
	title,
	type,
	poster,
	locale,
	releaseYear,
}: SearchResult) => {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<article className="col-6 col-md-2 card">
			<Link href={`/${locale}/${type}/${id}`}>
				<div className={`skeleton ${isLoading ? "" : "loaded"}`}>
					<Image
						onLoad={() => setIsLoading(false)}
						src={poster}
						width="592"
						height="841"
						alt={title}
					/>
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
