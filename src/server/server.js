import * as path from "path";
import express from 'express';
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../shared/App";

const app = express();

app.use('/static', express.static('./build/client'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
	res.render('index', { content: renderToString(<App />) })
})

app.listen(3000, () => {
	console.log( 'Server started http://localhost:3000');
})