import { CountryAvailabilityProps } from "@/globals/types"

const getFlagEmoji = (countryCode: string) =>
	countryCode
		.toUpperCase()
		.replace(/./g, char =>
			String.fromCodePoint(127397 + char.charCodeAt(0))
		)

export default function CountryAvailability({
	countryCode,
	countryName,
	availableSeasons = []
}: CountryAvailabilityProps) {
	const sortedSeasons = [...availableSeasons].sort((a, b) => a - b)

	return (
		<div className="inline-flex w-28 flex-col items-center p-2 text-center">
			<span
				className="text-3xl leading-none"
				style={{
					fontFamily:
						'"Twemoji Country Flags", system-ui, sans-serif'
				}}
				aria-hidden="true"
			>
				{getFlagEmoji(countryCode)}
			</span>

			<p className="mt-2 line-clamp-3 min-h-8 text-xs font-medium">
				{countryName}
			</p>

			{sortedSeasons.length > 0 && (
				<div className="mt-1 flex flex-wrap justify-center gap-1">
					<span className="text-md tracking-wider uppercase opacity-60">
						{sortedSeasons.length === 1
							? `S${sortedSeasons[0]}`
							: `S${sortedSeasons[0]}-${sortedSeasons[sortedSeasons.length - 1]}`}
					</span>
				</div>
			)}
		</div>
	)
}
