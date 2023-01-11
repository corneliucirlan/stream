import { useEffect } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

const MyDocument = ({ jsonObject }) => {
	useEffect(() => {
		console.log(jsonObject);
	}, []);

	return (
		<Html>
			<Head>
			</Head>
			<body style={{
				backgroundImage:  'url(' + JSON.stringify(jsonObject) + ')'
			}}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

MyDocument.getInitialProps = async (ctx) => {
	const initialProps = await Document.getInitialProps(ctx);
	const jsonObject = ctx.renderPage.jsonObject;
	return { ...initialProps, jsonObject };
};

export default MyDocument;
