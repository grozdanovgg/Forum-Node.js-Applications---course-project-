/* globals __dirname */

const express = require('express');
const attach = require('./public/routes/app-route');
const posts = require('./public/routes/posts-route');
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
posts(app, database);

// Tutorial for using database

database.deleteAll('categories');
const category = {
    title: 'Other',
    posts: [],
};
database.insert('categories', category).then();

database.showAll('categories').then((th) => console.log(th));


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Magic is running at' + port + '/'));
