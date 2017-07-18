/* globals __dirname */

const express = require('express');
const attach = require('./public/routes/app-route');
const posts = require('./public/routes/posts-route');
const auth = require('./public/routes/auth-route');
const path = require('path');
const bodyParser = require('body-parser');
const authConfig = require('./config/auth.config');
const Database = require('./database/mongodb');

const app = express();
const connectionstring = 'mongodb://myuser:ednodvetri@ds011462.mlab.com:11462/tellusdb';
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, './static')));
app.use('/libs', express.static(path.join(__dirname, './node_modules')));
app.use(bodyParser.urlencoded({ extended: true }));
const database = new Database(connectionstring);

app.use((req, res, next) => {
    console.log('---Current user---');
    console.log(req.user);
    next();
});

attach(app, database);
posts(app, database);
authConfig(app, database);
auth(app);

database.findOne('users', { "_id": "568c28fffc4be30d44d0398e" }).then((users) => console.log(users));

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
