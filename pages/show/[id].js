import { useEffect } from "react"
import Image from "next/image"
import { getMovieInfo, getMovieProviders, getAllProviders, getPhotoID } from "../../utils/justwatch"
import MovieProvider from "../../components/movie-rovider"

export const getStaticPaths = async () => ({
	paths: [], fallback: true
})

export const getStaticProps = async (context) => ({
	props: {
		movie: await getMovieInfo(context.params.id, "show", "en_US"),
		movieProviders: await getMovieProviders(context.params.id, "show"),
		allProviders: await getAllProviders(),
	},
})

export default ({ movie, movieProviders, allProviders }) => {
	// Loading the movie
	if (!movie) return <div>Loading</div>

	// https://images.justwatch.com/backdrop/175733591/s1920/black-widow-2020

	const jsonObject = {
		url: "https://images.justwatch.com/backdrop/175733591/s1920/black-widow-2020"
	};

	// Send backdrop image to _document.js
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.__NEXT_DATA__ = { props: {jsonObject}}
		}
	}, [ jsonObject ])

	// Get all providers for the movie
	let data = movieProviders.map((provider) => {
		// Get offers by monetization type
		const getOffersByType = (providerOffers, monetization) => {
			// Filter and map offers in a single step
			let offers = providerOffers
				.filter((offer) => offer.monetization_type === monetization)
				.map(
					({
						provider_id,
						package_short_name,
						presentation_type,
						monetization_type,
					}) => ({
						id: provider_id,
						shortName: package_short_name,
						name:
							typeof allProviders[provider_id] !== "undefined" &&
							allProviders[provider_id].clear_name,
						icon:
							typeof allProviders[provider_id] !== "undefined"
								? `https://images.justwatch.com/icon/${getPhotoID(
										allProviders[provider_id].icon_url
								  )}/s100`
								: null,
						resolution: presentation_type,
						type: monetization_type,
					})
				)

			// Group offers by id and name
			const groupedOffers = offers.reduce(
				(groups, { id, shortName, name, icon, resolution, type }) => {
					// Create a group key from id and name
					const groupKey = `${id}-${name}`

					// If group does not exist, create it with the offer properties
					if (!groups[groupKey]) {
						groups[groupKey] = {
							id,
							shortName,
							name,
							icon,
							resolutions: [],
							type,
						}
					}

					// Add resolution to group
					groups[groupKey].resolutions.push(resolution)

					return groups
				},
				{}
			)

			// Convert grouped offers object to array
			let list = Object.values(groupedOffers)

			// Return array if not empty
			return list.length > 0 ? list : null
		}

		// Get offers
		let flatrate = getOffersByType(provider.offers, "flatrate")
		let rent = getOffersByType(provider.offers, "rent")
		let buy = getOffersByType(provider.offers, "buy")

		return {
			country: provider.name,
			offers: Object.entries({ flatrate, rent, buy }).reduce(
				(acc, [key, value]) => {
					if (value !== null) {
						acc[key] = value
					}
					return acc
				},
				{}
			),
		}
	})

	console.log("Data: ", movieProviders);

	return (
		<div className="container" style={{ color: "white" }}>
			<div className="row">
				<div className="col-12 col-md-3">
					<Image
						src={movie.poster}
						width="592"
						height="841"
						alt={movie.title}
						style={{ objectFit: "contain" }}
					/>
				</div>

				<div className="col-12 col-md-9">
					<h1>{movie.title}</h1>
					<p className="offer-type">
						{movie.object_type} / {movie.original_release_year}
					</p>
					<p className="offer-short-description">
						{movie.short_description}
					</p>
					<h5 className="offer-cast-title">Cast</h5>
					<div className="row d-flex">
						{movie.credits.slice(0, 3).map((credit) => (
							<div key={credit.person_id} className="col-4">
								<p className="actor-name">{credit.name}</p>
								<p className="actor-character">
									{credit.character_name}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<section className="row offers-available">
				{data.map((provider, key) => (
					<MovieProvider key={key} provider={provider} />
				))}
			</section>
		</div>
	)
}
