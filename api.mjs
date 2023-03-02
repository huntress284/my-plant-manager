import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import { router } from './routes/index.mjs';

const api = express();
api.use(cors());

api.set('view engine', 'pug');

const port = process.env.PORT ?? 3000;

api.use(express.json());
api.use(express.urlencoded({ extended: false }));

api.use(router);

export { api }