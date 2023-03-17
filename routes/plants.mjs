import express from 'express';

import { list_plants, create_plant, delete_plant, list_nursery, create_nursery, delete_nursery} from "../controllers/plants.mjs";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.route('/plants')
	.get(async (req, res) => {
		const data = await list_plants();
		res.status(200).json(data);
	})
	.post(async (req, res) => {
		const data = await create_plant(req.body.plantId, req.body.plantName);
		res.status(201).end();
	})
	.delete(async (req, res) => {
		const data = await delete_plant(req.body.plantId);
		res.status(204).end();
	});

router.route('/nursery')
	.get(async  (req,res) => {
		const data = await list_nursery(req.body.plantId, req.body.plantName);
		res.status(200).json(data);
	})
	.post(async  (req,res) => {
		const data = await create_nursery(req.body.plantId, req.body.plantName);
		res.status(200).json(data);
	})
	.delete(async  (req,res) => {
		const data = await delete_nursery(req.body.plantId);
		res.status(200).json(data);
	});

export { router as plants }