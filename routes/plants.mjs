import express from 'express';

import {list_plants, create_plant, update_status, water_plant, delete_plant, add_note, rename_plant}
    from "../controllers/plants.mjs";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: false}));

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
        const data = await water_plant(req.body.plantId, req.body.date);
        res.status(201).end();
    });

router.route('/plants/names:id')
    .put(async (req, res) => {
        const data = await rename_plant(req.body.plantId, req.body.name);
        res.status(201).end();
    });

router.route('/plants/notes')
    .get(async (req, res) => {
        const data = await list_plants();
        res.status(200).json(data);
    })
    .put(async (req, res) => {
        const data = await add_note(req.body.plantId, req.body.note);
        res.status(201).end();
    });

export {router as plants}