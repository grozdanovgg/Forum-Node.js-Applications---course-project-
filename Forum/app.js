/*globals __dirname */

const express = require('express');
const attach = require('./public/routes/app-route');
const path = require('path');

const app = express();
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, './static')));
app.use('/libs', express.static(path.join(__dirname, './node_modules')));

attach(app);

//Tutorial for using database

const db = require('./database/mongodb');
const database = new db('mongodb://localhost/items-db');
const record = {
    title: 'Why does it rain',
    author: 'Martin Kamenov',
};

database.deleteAll('posts');
for (var i = 0; i < 23; i++) {
    const record = {
        title: i + 1,
        author: 'Martin Kamenov',
    };
    database.insert('posts', record).then();
}
database.showAll('posts').then((posts) => console.log(posts));


app.listen(3001, () => console.log('Magic is running at 3001'));
