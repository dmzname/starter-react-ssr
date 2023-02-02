const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';

const GLOBAL_STYLES = /\.global\.s[ac]ss$/;

module.exports = {
	target: "node",
	mode: NODE_ENV ? NODE_ENV : 'development',
	entry: path.resolve(__dirname, '../src/server/server.js'),
	output: {
		path: path.resolve(__dirname, '../build/server'),
		filename: "server.js"
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: path.resolve(__dirname, "../src/server/views"), to: path.resolve(__dirname, "../build/server/views") },
			],
		}),
	],
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/,
				exclude: /node_modules/,
				use: ['ts-loader']
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								localIdentName: '[name]__[local]-[hash:base64:5]',
								exportOnlyLocals: true,
							},
						},
					},
					'sass-loader',
				],
				exclude: GLOBAL_STYLES,
			},
			{
				test: GLOBAL_STYLES,
				use: [ 'css-loader', 'sass-loader' ],
			},
		]
	},
	optimization: {
		minimize: false
	},
	stats: 'errors-only',
}