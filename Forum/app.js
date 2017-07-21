/* globals __dirname, process  */
/* eslint no-process-env: off*/

const express = require('express');
const appRouth = require('./public/routes/app-route');
const posts = require('./public/routes/posts-route');
const users = require('./public/routes/users-route');
const auth = require('./public/routes/auth-route');
const path = require('path');
const bodyParser = require('body-parser');
const authConfig = require('./config/auth.config');
const Database = require('./database/mongodb');

const app = express();
const connectionstring = 'mongodb://myuser:ednodvetri@ds011462.mlab.com:11462/tellusdb';
// const connectionstring = 'mongodb://localhost/items-db';
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, './static')));
app.use('/libs', express.static(path.join(__dirname, './node_modules')));
app.use(bodyParser.urlencoded({ extended: true }));
const database = new Database(connectionstring);

/* const category1 = {
    title: 'Animals',
    posts: [],
};
database.insert('categories', category1).then((c) => console.log(c));*/

authConfig(app, database);
appRouth(app, database);
posts(app, database);
users(app, database);
auth(app, database);

// database.showAll('users').then(u => console.log(u));
database.deleteAll('posts/Sport');
database.deleteAll('users');


// Tutorial for using database

/* database.deleteAll('categories');
const category = {
    title: 'Other',
    posts: [],
};
database.insert('categories', category).then();

database.showAll('categories').then((th) => console.log(th));*/


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Magic is running at' + port + '/'));
