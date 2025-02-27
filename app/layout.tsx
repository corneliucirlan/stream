// Tailwind CSS
import "./style.sass"

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
			<body  className={`bg-black ${inter.className}`}>{children}</body>
		</html>
	)
}
