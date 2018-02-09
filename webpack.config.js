var path = require('path');

module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
		publicPath: "/assets/",
		library: 'formValidation',
		libraryTarget: "umd"
	},
	devtool: 'cheap-source-map',
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