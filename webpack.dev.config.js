const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, './src'),
		publicPath: '',
	},
	mode: 'development',
	devServer: {
		contentBase: path.join(__dirname, './src'),
		index: 'index.html',
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.(svg|png|jpeg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images',
							publicPath: 'images',
							emitFile: true,
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader?url=false'],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
	],
};
