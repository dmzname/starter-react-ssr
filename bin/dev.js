const path = require('path');
const webpack = require('webpack');
const [clientConfig, serverConfig]= require('../webpack.config.js');
const nodemon = require('nodemon');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');


const hmrServer = express();

const serverCompiler = webpack(serverConfig);
const clientCompiler = webpack(clientConfig);

serverCompiler.run((err) => {
	if(err) {
		console.log('Compilation failed: ' + err);
	}

	serverCompiler.watch({}, (err) => {
		if(err) {
			console.log('Compilation failed: ' + err);
		}
		console.log('Compilation was successfully!')
	})

	nodemon({
		script: path.resolve(__dirname, '../build/server/server.js'),
		watch: [
			path.resolve(__dirname, '../build/server'),
			path.resolve(__dirname, '../build/client')
		]
	})
});



hmrServer.use(
	webpackDevMiddleware(clientCompiler, {
		publicPath: clientConfig.output.publicPath,
		serverSideRender: true,
		writeToDisk: true,
		stats: 'errors-only',
	})
);

hmrServer.use(
	webpackHotMiddleware(clientCompiler, {
		path: '/static/__webpack_hmr',
	})
);

hmrServer.listen(3001, () => {
	console.log('HMR server started');
});
