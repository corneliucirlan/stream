module.exports = () => {

	const rewrites = () => {
		return [
			{
				source: "/api/:path*",
				destination: "https://apis.justwatch.com/:path*"
			}
		]
	}

	return {
		rewrites
	}
}
