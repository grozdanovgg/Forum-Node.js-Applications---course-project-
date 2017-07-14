const express = require('express');

const app = express();
app.set('view engine', 'pug');

require('./public/routes/app-route')(app);

const db = require('./database/mongodb');
const database = new db('mongodb://localhost/items-db');
const record = {
    text: 'Yay'
};
database.showAll('items');

app.listen(3001, () => console.log('Magic is running at 3001'));