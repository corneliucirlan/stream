module.exports = () => {
	// API Rewrites
	const rewrites = async () => {
		return [
			{
				source: "/api/:path*",
				destination: "https://apis.justwatch.com/:path*"
			}
		]
	}

	return {
		// Whitelist images domain
		images: {
			domains: ["images.justwatch.com"]
		},

		// API Rewrites
		rewrites,

		// App directory
		experimental: { appDir: true }
	}
}
