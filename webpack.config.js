var path = require('path');

module.exports = {
	entry: './js/TestClass.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
		publicPath: "/assets/",
		library: 'TestClass',
		libraryTarget: "umd"
	},
	devtool: 'inline-source-map',
	resolve: {
        extensions: ['.js']
    },
	module: {
		rules: [
		{
			test: /\.js$/,
			exclude: [
					path.resolve(__dirname, "node_modules")
					],
			loader: 'babel-loader',
			options: {
				presets: ['es2015']
			}
		}
		]
	}
}