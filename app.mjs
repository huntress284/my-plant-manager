import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';
import fs from 'fs';

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'pug');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/static', express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
    const url = 'http://localhost:3001/api/plants';

    const response = await fetch(url);
    const json = await response.json();

    res.locals.plants = json;

    console.log(res.locals);

    // console.log(json);

    res.status(200).render('home');
});

app.get('/nursery', async (req, res) => {
    res.status(200).render('nursery');
});



export {app}