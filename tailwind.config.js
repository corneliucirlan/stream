/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}"
	],
	theme: {
		fontSize: {
			h1: "3rem",
			h2: "1.875rem",
			h3: "1.5rem"
		},
		extend: {
			aspectRatio: {
        		'7/10': '7 / 10',
      		},
		}
	},
	variants: {},
	plugins: []
}
