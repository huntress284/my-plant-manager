import express from 'express';

import { list_plants, create_plant, update_status, update_plant, delete_plant}
	from "../controllers/plants.mjs";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.route('/plants')
	.get(async (req, res) => {
		const data = await list_plants();
		res.status(200).json(data);
	})
	.post(async (req, res) => {
		const data = await create_plant(req.body.plantId, req.body.plantName, req.body.status);
		res.status(201).end();
	})
	.put(async (req, res) => {
		const data = await update_status(req.body.plantId, req.body.status);
		res.status(201).end();
	})

	.delete(async (req, res) => {
		const data = await delete_plant(req.body.plantId);
		res.status(204).end();
	});

router.route('/plants:id')
	.put(async (req, res) => {
		const data = await update_plant(req.body.plantId);
		res.status(201).end();
	});

// router.route('/nursery')
// 	.get(async  (req,res) => {
// 		const data = await list_nursery(req.body.plantId, req.body.plantName);
// 		res.status(200).json(data);
// 	})
// 	.post(async  (req,res) => {
// 		const data = await create_nursery(req.body.plantId, req.body.plantName);
// 		res.status(200).json(data);
// 	})
// 	.delete(async  (req,res) => {
// 		const data = await delete_nursery(req.body.plantId);
// 		res.status(200).json(data);
// 	});

// router.route('/graveyard')
// 	.get(async  (req,res) => {
// 		const data = await list_graveyard();
// 		res.status(200).json(data);
// 	})
// 	.put(async  (req,res) => {
// 		const data = await move_to_graveyard(req.body.plantId);
// 		res.status(200).json(data);
// 	})
// 	.delete(async  (req,res) => {
// 		const data = await delete_dead(req.body.plantId);
// 		res.status(204).json(data);
// 	})


export { router as plants }