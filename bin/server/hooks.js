const renderHtml = require("../../src/shared/views/index.html.js");

const getContextualAssets = (isProduction, { hmrPublicPath }) => {
	// Prod:
	if (isProduction) {
		const manifest = require("../../dist/webpack/manifest.json");
		const css = manifest.app.css;
		const js = manifest.app.js;
		const vendorJs = manifest.vendor.js;

		return {
			scripts: `<script type="text/javascript" src="${vendorJs}"></script>
        <script type="text/javascript" src="${js}"></script>`,
			styles: `<link rel="stylesheet" href="${css}">`
		};
	}
	// Dev:
	return {
		scripts: `<script type="text/javascript" src="${hmrPublicPath}app.js"></script>`
	};
};

const onError = res => (code, body) => {
	return res.status(code).send(body);
};

const onSuccess = (res, isProduction, opts) => body => {
	const locals = Object.assign(
		{},
		{
			body
		},
		getContextualAssets(isProduction, opts)
	);

	return res.status(200).send(renderHtml(locals));
};

const onRedirect = res => redirectedUrl => {
	return res.redirect(302, redirectedUrl);
};

module.exports = {
	onSuccess,
	onRedirect,
	onError
};
