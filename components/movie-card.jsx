import Link from "next/link"
import Image from "next/image"

export default ({ id, title, type, poster, locale, releaseYear }) => {

	return (
		<article className="col-6 col-md-2 card">
			<Link href={`/${locale}/${type}/${id}`}>
				<Image src={poster} width="592" height="841" alt={title} />
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
	);
}
