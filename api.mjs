import 'dotenv/config';

import express from 'express';

import { router } from './routes/index.mjs';

const api = express();

const port = process.env.PORT ?? 3000;

api.use(router);

api.use(express.json());
api.use(express.urlencoded({ extended: false }));

api.get('/api/plants', (req, res) => {


});

export { api }