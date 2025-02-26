/** @type {import('next').NextConfig} */
const nextConfig = {
	// Whitelist images domain
	images: {
		remotePatterns: [
			{
				hostname: "images.justwatch.com"
			}
		]
	}
}

module.exports = nextConfig
