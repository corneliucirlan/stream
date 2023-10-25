export const getRandomBackdropID = (ids: Array<number>): number | null =>
	ids !== null && ids !== undefined
		? ids[Math.floor(Math.random() * ids.length)]
		: 0

export const getPhotoID = (poster: string): string | null => {
	// Regular expression to match photo id
	const photoRegex = /\s*([0-9]+)/

	// Execute the regular expression on the poster string
	const photo = photoRegex.exec(poster)

	// Return the matched photo id, or null if not found
	return photo?.[0] || null
}
