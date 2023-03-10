import express from 'express';

import { plants } from './plants.mjs';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const routes = [ plants ];

router.use('/api', routes);

export { router };
