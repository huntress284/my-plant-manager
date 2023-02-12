import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'pug');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const url = 'http://localhost:3001/api/plants';

    const response = await fetch(url);
    const json     = await response.json();

    res.locals.plants = json;

    res.status(200).render('home');
});


export { app }