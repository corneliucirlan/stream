const SearchInput: React.FC<{
	searchQuery: string
	setSearchQuery: (query: string) => void
}> = ({ searchQuery, setSearchQuery }) => {
	return (
		<input
			type="text"
			className="focus:shadow-outline w-full appearance-none rounded border px-5 py-3 leading-tight text-gray-700 shadow focus:outline-none"
			onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
				setSearchQuery(event.target.value)
			}
			value={searchQuery}
			placeholder="Search for a movie or tv show"
			autoFocus={true}
		/>
	)
}

export default SearchInput
