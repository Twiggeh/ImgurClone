import express from 'express';
import cors from 'cors';
import https from 'https';
import { join, resolve, dirname } from 'path';
import { cwd } from 'process';
import http from 'http';
import { config } from 'dotenv';
import { createWriteStream, readFileSync } from 'fs';
import morgan from 'morgan';
import { URL } from 'url';
import mongoose from 'mongoose';
import { mongooseKey } from '../keys/keys.js';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from '../gql/types.js';
import resolvers from '../gql/resolvers.js';
import { graphqlUploadExpress } from 'graphql-upload';

config();

// TODO : make them clearer to use, secure port means port that the server is running on, upgrade port is a https upgrader

const SECURE_PORT = process.env.SECURE_PORT;
const UPGRADE_PORT = process.env.UPGRADE_PORT;
const DEV_PORT = process.env.DEV_PORT;

const isProd = process.env.NODE_ENV === 'production';
const secureServerPort = isProd ? SECURE_PORT : DEV_PORT;
const upgradeServerPort = UPGRADE_PORT;

const __dirname = decodeURI(dirname(new URL(import.meta.url).pathname));
const domain = process.env.DOMAIN ? process.env.DOMAIN : 'localhost';
const subDom = process.env.SUBDOMAIN ? process.env.SUBDOMAIN : '';
const domExt = process.env.DOMAIN_EXTENSION ? process.env.DOMAIN_EXTENSION : '';
const hostname = [subDom, domain, domExt].filter(c => !!c).join('.');
export const SERVER_URL = `${hostname}:${secureServerPort}`;
export const PROJECT_ROOT = resolve(__dirname, '../../../');
export const SERVER_ROOT = resolve(__dirname, '../');

const app = express();

const gqlServer = new ApolloServer({
	uploads: false,
	typeDefs,
	resolvers,
	context: ({ req, res }) => {
		return {};
	},
});

app.use(
	cors({
		origin: (origin, cb) => {
			return cb(null, true);
			// if (!allowedOrigins.includes(origin)) {
			// 	const msg = `The CORS policy doesn't allow access from ${origin}.`;
			// 	return cb(msg as any, false);
			// }
			// return cb(null, true);
		},
	})
);

app.use('/graphql', graphqlUploadExpress());

gqlServer.applyMiddleware({ app });

const logStream = createWriteStream(join(__dirname, 'access.log'), { flags: 'a' });
const myDate = new Date();

morgan.token('time', () => {
	return myDate.toISOString();
});

const logger = morgan(':time :url :method :remote-addr :user-agent :response-time ms', {
	stream: logStream,
});

app.disable('x-powered-by');

const allowedOrigins = [`https://${hostname}`];
// if (!isProd)
allowedOrigins.push('http://localhost:5000', 'http://127.0.0.1:5000', undefined);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(mongooseKey, { useNewUrlParser: true, useUnifiedTopology: true }, e => {
	if (e) return void console.log('Mongoose failed to connect', e);
	console.log('Mongoose connected successfully');
});

app.use((req, res, next) => {
	res.header('X-XSS-Protection', '1; mode=block');
	res.header('X-Frame-Options', 'deny');
	res.header('X-Content-Type-Options', 'nosniff');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Origin',
		isProd ? `https://${hostname}` : 'localhost:5000'
	);
	next();
});

app.use(logger);

//if (isProd) {
//	app.use((req, res, next) => {
//		if (req.hostname.startsWith(`${subDom}.`)) return next();
//		res.redirect(301, `https://${subDom}.${req.hostname}${req.url}`);
//	});
//}
app.get('/public/uploads/*', (req, res) => {
	res.sendFile(join(SERVER_ROOT, req.url));
});

app.get('/public/*', (req, res) => {
	res.sendFile(join(PROJECT_ROOT, 'client', 'dist', req.url));
});

app.get('*', (req, res) => {
	console.log(__dirname);
	res.sendFile(join(PROJECT_ROOT, 'client', 'dist', 'index.html'));
});

////if (isProd) {
//	http
//		.createServer((req, res) => {
//			console.log('Redirecting to: ', `https://${hostname}${req.url}`);
//			logger(req, res, err => {
//				if (err) console.error(err);
//				res
//					.writeHead(301, {
//						Location: `https://${hostname}${req.url}`,
//					})
//					.end();
//			});
//		})
//		.listen(upgradeServerPort, () => {
//			console.log(`Http upgrade server online on port ${upgradeServerPort}`);
//		});
//
//	https
//		.createServer(
//			{
//				key: readFileSync(resolve(cwd(), 'cert', 'privkey.pem')),
//				cert: readFileSync(resolve(cwd(), 'cert', 'fullchain.pem')),
//			},
//			app
//		)
//		.listen(secureServerPort, () => {
//			console.log(`Secure Server is listening on port ${secureServerPort}`);
//		});
//} else {
app.listen(secureServerPort, () => {
	console.log(`Dev server is listening on port ${secureServerPort}`);
});
// }
