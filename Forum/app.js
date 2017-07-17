/* globals __dirname */

const express = require('express');
const attach = require('./public/routes/app-route');
const path = require('path');
const bodyParser = require('body-parser');
const Database = require('./database/mongodb');

const app = express();
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, './static')));
app.use('/libs', express.static(path.join(__dirname, './node_modules')));
app.use(bodyParser.urlencoded({ extended: true }));
const database = new Database('mongodb://localhost/items-db');

attach(app, database);

// Tutorial for using database

/*const record = {
    title: 'Why does it rain',
    author: 'Martin Kamenov',
};

database.deleteAll('themes');
for (let i = 0; i < 23; i++) {
    const themes = {
        title: 'Theme number' + i,
        author: 'Martin Kamenov',
    };
    database.insert('themes', themes).then();
}
database.showAll('themes').then((th) => console.log(th));*/


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Magic is running at' + port + '/'));
