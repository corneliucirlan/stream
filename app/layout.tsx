// Tailwind CSS
import "./style.css"

// Metadata
import type { Metadata } from "next"

// Google font
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Global Streaming Search for Movies and TV Shows",
	description:
		"A web app designed for easy searching of global streaming options for movies and TV shows."
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={`bg-black ${inter.className}`}>
				{children}
				<div className="fixed bottom-2 left-1/2 w-full max-w-xl -translate-x-1/2 transform text-center text-white opacity-20">
					This product uses the TMDB API but is not endorsed or
					certified by{" "}
					<a
						href="https://www.themoviedb.org/"
						target="_blank"
						rel="noopen nofollow"
					>
						TMDB
					</a>
					.
				</div>
			</body>
		</html>
	)
}
