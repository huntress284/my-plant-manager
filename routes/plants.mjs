import express from 'express';

import { list_plants, create_plant, delete_plant} from "../controllers/plants.mjs";

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



export { router as plants }