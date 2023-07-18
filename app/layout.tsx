// Global SASS
import "../sass/style.sass"

export default ({ children }: { children: React.ReactNode }) => {
	return (
		<html>
			<head />
			<body>{children}</body>
		</html>
	)
}
