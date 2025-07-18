import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./sections/**/*.{js,ts,jsx,tsx,mdx}",
		"./globals/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			aspectRatio: {
				"7/10": "7 / 10"
			}
		}
	},
	plugins: []
}
export default config
