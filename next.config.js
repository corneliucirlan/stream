/** @type {import('next').NextConfig} */
const nextConfig = {
	// Whitelist images domain
	images: {
		remotePatterns: [
			{
				hostname: "image.tmdb.org"
			}
		]
	}
}

module.exports = nextConfig
