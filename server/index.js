import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

/*views*/
var hbs = require('express-handlebars');
var path = require('path');

import initializeDb from './db';
import {facets} from './middleware';
import api from './api';
import config from './config.json';

import {question, auth} from './routes'

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

// connect to db
// initializeDb( db => {

	// internal middleware
	// app.use(facets({ config }));

	// api router
	app.use('/api', api({ config }));

	app.use('/api/questions', question)
	app.use('/api/auth', auth)


	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
// });

export default app;
