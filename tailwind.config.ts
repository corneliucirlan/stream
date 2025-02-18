import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./sections/**/*.{js,ts,jsx,tsx,mdx}",
		"./globals/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		fontSize: {
			h1: "3rem",
			h2: "1.875rem",
			h3: "1.5rem"
		},
		extend: {
			aspectRatio: {
				"7/10": "7 / 10"
			}
		}
	},
	plugins: []
}
export default config
