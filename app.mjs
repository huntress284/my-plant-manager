import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';
import multer from 'multer';
import {list_plants} from "./controllers/plants.mjs";
import {plants} from "./routes/plants.mjs";

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
    const url = 'http://localhost:3001/api/plants';

    const data = await list_plants();
    JSON.stringify(data);

    const response = await fetch(url);
    const json = await response.json();

    res.locals.plants = json;
    res.locals.data = data;

    console.log(res.locals);

    res.status(200).render('nursery');
});

app.get('/graveyard', async (req, res) => {
    const url = 'http://localhost:3001/api/plants';
    const response = await fetch(url);
    const json = await response.json();

    res.locals.plants = json;
    console.log(res.locals);

    res.status(200).render('graveyard');
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.picname + ".jpg")
    }
})


var upload = multer({ storage: storage })


app.use('/uploads', express.static('uploads'));


app.post('/', upload.single('profile-file', 'picname'), async function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.body.picname))
    console.log(JSON.stringify(req.file))

    const url = 'http://localhost:3001/api/plants';
    const response = await fetch(url);
    const json = await response.json();
    res.locals.plants = json;
    console.log(res.locals);
    res.status(200).render('home');
})
app.post('/nursery', upload.single('profile-file', 'picname'), async function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.body.picname))
    console.log(JSON.stringify(req.file))
    const url = 'http://localhost:3001/api/nursery';
    const response = await fetch(url);
    const json = await response.json();
    res.locals.plants = json;
    console.log(res.locals);
    res.status(200).render('nursery');
})



export {app}