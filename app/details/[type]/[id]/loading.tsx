import { CSSProperties, FC } from "react"

interface PulseDivProps {
	className?: string
	style?: CSSProperties
}

const PulseDiv: FC<PulseDivProps> = ({ className, style }) => (
	<div
		style={style}
		className={`animate-pulse rounded-md bg-white bg-opacity-20 ${className}`}
	/>
)

const Loading: FC = () => (
	<>
		<div className="fixed inset-x-0 inset-y-0 -z-10 bg-black"></div>
		<div className="flex h-svh bg-black">
			<div className="container mx-4 mt-5 max-w-7xl md:mx-auto md:mt-10">
				<div className="flex flex-col md:flex-row">
					<div className="mb-10 mr-4 w-full md:mb-0 md:w-1/4">
						<PulseDiv className="aspect-7/10 w-full" />
					</div>
					<div className="w-full md:w-3/4">
						<PulseDiv className="h-14 w-full" />
						<PulseDiv className="mt-4 h-4 w-1/3" />

						<div className="mt-4 h-auto">
							{Array(5)
								.fill(0)
								.map((_, index) => (
									<PulseDiv
										key={index}
										className="w-100 mt-2 h-4"
									/>
								))}
						</div>

						<PulseDiv className="mt-8 h-8 w-1/4" />
						<div className="mt-4 h-auto">
							{Array(3)
								.fill(0)
								.map((_, index) => (
									<PulseDiv
										key={index}
										className="w-100 mt-2 h-4"
									/>
								))}
						</div>
					</div>
				</div>

				<div className="container mx-auto mt-20 max-w-7xl">
					<div className="mb-8 rounded-xl bg-white bg-opacity-5 p-12 pb-4">
						<PulseDiv className="mt-8 h-8 w-1/3 md:w-1/4" />
						{Array(4)
							.fill(0)
							.map((_, index) => (
								<div key={index} className="mt-4">
									<PulseDiv className="h-4 w-1/3 md:w-1/4" />

									{Array(15)
										.fill(0)
										.map((_, index) => (
											<div
												key={index}
												className="inline-flex max-w-24 flex-col items-center justify-items-center p-4 text-center"
											>
												<PulseDiv className="h-10 w-10" />
												<PulseDiv className="mt-2 h-2 w-full" />
												<PulseDiv className="mt-2 h-2 w-full" />
											</div>
										))}
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	</>
)

export default Loading
