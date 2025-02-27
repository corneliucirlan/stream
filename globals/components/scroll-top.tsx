"use client"

import { useEffect, useState } from "react"
import { FaArrowUp } from "react-icons/fa"

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false)

	const toggleVisibility = () => {
		if (window.pageYOffset > 300) setIsVisible(true)
		else setIsVisible(false)
	}

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		})
	}

	const handleKeyPress = (event: KeyboardEvent) => {
		if (event.key === "T" || event.key === "t") {
			scrollToTop()
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility)
		window.addEventListener("keydown", handleKeyPress)

		return () => {
			window.removeEventListener("scroll", toggleVisibility)
			window.removeEventListener("keypress", handleKeyPress)
		}
	}, [])

	return (
		<div className="fixed bottom-8 right-8 z-50">
			{isVisible && (
				<button
					onClick={scrollToTop}
					className="rounded-lg bg-black px-4 py-2 font-bold text-white shadow-lg hover:bg-gray-700"
				>
					<FaArrowUp />
				</button>
			)}
		</div>
	)
}

export default ScrollToTop
