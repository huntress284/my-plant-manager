import http from 'node:http';

import { api } from './api.mjs';
import { app } from './app.mjs';

const api_port = process.env.API_PORT ?? 3001;
const app_port = process.env.APP_PORT ?? 3000;

http.createServer(api).listen(api_port, () => {
    console.log(`Listening on port ${api_port}...`);
});

http.createServer(app).listen(app_port, () => {
    console.log(`Listening on port ${app_port}...`);
});