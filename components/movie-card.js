import Link from "next/link"
import Image from "next/image"

export default ({ id, title, type, poster }) =>
	<article className="col-12 col-md-2 card">
		<Link href='/[type]/[id]' as={`/${type}/${id}`}>
			<Image
				src={poster}
				width="592"
				height="841"
				alt={title}
				style={{ objectFit: 'contain' }}
			/>
		</Link>
	</article>
 