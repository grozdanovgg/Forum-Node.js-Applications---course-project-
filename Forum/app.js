const express = require('express');
const attach = require('./public/routes/app-route');

const app = express();
app.set('view engine', 'pug');

attach(app);

const db = require('./database/mongodb');
const database = new db('mongodb://localhost/items-db');
const record = {
    text: 'Yay'
};
database.showAll('items');

const db = require('./database/mongodb');
const database = new db('mongodb://localhost/items-db');
const record = {
    text: 'Yay'
};
database.showAll('items');

app.listen(3001, () => console.log('Magic is running at 3001'));