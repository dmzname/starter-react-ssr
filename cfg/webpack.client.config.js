const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';

const APP_ENTRY = path.resolve(__dirname, '../src/client/index.jsx');
const WEBPACK_HOT_ENTRY = 'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr';


module.exports = {
	mode: NODE_ENV ? NODE_ENV : 'development',
	entry: IS_DEV ? [APP_ENTRY, WEBPACK_HOT_ENTRY] : APP_ENTRY,
	output: {
		path: path.resolve(__dirname, '../build/client'),
		filename: "index.js",
		publicPath: '/static/'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve('ts-loader'),
						options: {
							getCustomTransformers: () => ({
								before: [IS_DEV && ReactRefreshTypeScript()].filter(Boolean),
							}),
							transpileOnly: IS_DEV,
						},
					},
				],
			}
		]
	},
	plugins: [IS_DEV && new ReactRefreshWebpackPlugin(), IS_DEV && new HotModuleReplacementPlugin()].filter(Boolean),
	devtool: IS_DEV ? 'eval' : false,
	stats: 'errors-only',
}