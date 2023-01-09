import Image from "next/image"
import { useEffect } from "react"
import { getMovieInfo, getMovieProviders, getAllProviders, getPhotoID } from "../../utils/justwatch"

export const getStaticPaths = async () => ({
	paths: [], fallback: true
})

export const getStaticProps = async (context) => ({
	props: {
		movie: await getMovieInfo(context.params.id, 'movie', 'en_US'),
		movieProviders: await getMovieProviders(context.params.id, 'movie'),
		allProviders: await getAllProviders()
	}
})

export default ({ movie, movieProviders, allProviders }) => {

	if (!movie) return <div>Loading</div>
	// console.log("Movie data: ", movie)
	// console.log("Movie providers: ", movieProviders)
	console.log("All providers: ", allProviders)

	// Get all providers for the movie
	let data = movieProviders.map(provider => {
console.log(provider)
		// Get offers by monetization type
		const getOffersByType = (providerOffers, monetization) => {

			// Filter and map offers in a single step
			const offers = providerOffers
				.filter(offer => offer.monetization_type === monetization)
				.map(({ provider_id, package_short_name, presentation_type, monetization_type }) => ({
					id: provider_id,
					shortName: package_short_name,
					name: allProviders[provider_id].clear_name,
					icon: `https://images.justwatch.com/icon/${getPhotoID(allProviders[provider_id].icon_url)}/s100`,
					resolution: presentation_type,
					type: monetization_type,
			}))

			// Group offers by id and name
			const groupedOffers = offers.reduce((groups, { id, shortName, name, icon, resolution, type }) => {
			
				// Create a group key from id and name
				const groupKey = `${id}-${name}`

				// If group does not exist, create it with the offer properties
				if (!groups[groupKey]) {
					groups[groupKey] = { id, shortName, name, icon, resolutions: [], type }
				}

				// Add resolution to group
				groups[groupKey].resolutions.push(resolution);

				return groups;
			}, {})

			// Convert grouped offers object to array
			return Object.values(groupedOffers)
		}

		let flatrate = getOffersByType(provider.offers, 'flatrate')
		let rent = getOffersByType(provider.offers, 'rent')
		let buy = getOffersByType(provider.offers, 'buy')

		return {
			country: provider.name,
			offers: {
				flatrate, rent, buy
			}
		}
	})

	console.log("Data: ", data)

	return (
		<div>
			{/* <Image
				src={movie.poster}
				width="592"
				height="841"
				alt={movie.title}
				style={{ objectFit: 'contain' }}
			/> */}

			{/* {movieProviders.map(( provider, key ) =>
				<h2 key={key}>{provider.name}</h2>
			)} */}
		</div>
	)
}
