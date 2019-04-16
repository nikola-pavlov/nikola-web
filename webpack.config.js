var path = require("path");

module.exports = {
	entry: "./public/assets/scripts/App.js",
	output: {
		path: path.resolve(__dirname, "./public/temp/scripts"),
		filename: "App.js"
	}
}