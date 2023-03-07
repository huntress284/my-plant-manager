import 'dotenv/config';
import multer from 'multer';
import express from 'express';
import cors from 'cors';

import { router } from './routes/index.mjs';

// const upload = multer();
const api = express();
api.use(cors());
// api.use(multer);

api.set('view engine', 'pug');

const port = process.env.PORT ?? 3000;

api.use(express.json());
api.use(express.urlencoded({ extended: false }));

api.use(router);

export { api }