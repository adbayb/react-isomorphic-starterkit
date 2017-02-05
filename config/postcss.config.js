// postcss-cssnext already includes postcss-nested:
// same for autoprefixer
// see. http://cssnext.io/features/
const postcssNext = require("postcss-cssnext");

module.exports = [
	postcssNext({
		// autoprefixer browsers env:
		browsers: ["> 1%", "last 2 versions"]
	})
];
