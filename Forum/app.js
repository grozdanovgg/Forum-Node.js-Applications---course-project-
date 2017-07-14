/*globals __dirname */

const express = require('express');
const attach = require('./public/routes/app-route');
const path = require('path');

const app = express();
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, './static')));
app.use('/libs', express.static(path.join(__dirname, './node_modules')));

attach(app);

const db = require('./database/mongodb');
const database = new db('mongodb://localhost/items-db');
const record = {
    text: 'Yay'
};
database.showAll('items');

app.listen(3001, () => console.log('Magic is running at 3001'));