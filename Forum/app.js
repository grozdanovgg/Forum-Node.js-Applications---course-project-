/* globals __dirname, process  */
/* eslint no-process-env: off*/
const express = require('express');
const appRouth = require('./controllers/app-route');
const posts = require('./controllers/posts-route');
const users = require('./controllers/users-route');
const auth = require('./controllers/auth-route');
const about = require('./controllers/about-route');
const path = require('path');
const bodyParser = require('body-parser');
const authConfig = require('./config/auth.config');
const Database = require('./database/mongodb');


// Socket IO not working correctly...
const app = express();
// const http = require('http').Server(app);
// var io = require('socket.io')(http);

// const mongoURL = process.env.MONGO_DB_URL;
// const connectionstring = 'mongodb://admin:adminadmin@10.0.22.131:27017/MongoDB-MongoDBStack-1GJGQ73ACA1kWM';
const connectionstring = 'mongodb://myuser:ednodvetri@ds011462.mlab.com:11462/tellusdb';
// const connectionstring = 'mongodb://localhost/items-db';
app.use(express.static(__dirname + '../Forum'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, './static')));
app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
app.use(bodyParser.urlencoded({ extended: true }));
const database = new Database(connectionstring);

// sport, other, cars, space, men, women, clothing, movies, sex, music, programming, animals, school, work
/* const category1 = {
    title: 'Games',
    bio: '',
    posts: [],
};
database.insert('categories', category1).then((c) => console.log(c));*/

authConfig(app, database);
appRouth(app, database);
posts(app, database);
users(app, database);
auth(app, database);
about(app);

// database.showAll('users').then(u => console.log(u));
// database.deleteAll('posts/Sport');
// database.deleteAll('users');


// Tutorial for using database

/* database.deleteAll('categories');
const category = {
    title: 'Other',
    posts: [],
};
database.insert('categories', category).then();*/

//database.showAll('categories').then((th) => console.log(th));

//database.findById('categories','59743f13e392ab1c148c64b0').then((f)=>console.log(f));
//database.update('test',{text:'a'},{text:'b'}).then((d)=>console.log(d));


const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
    console.log('Magic is running at' + port + '/')
);


const io = require('socket.io').listen(server);

io.on('connection', function(socket) {
    // Server side receiving the message then emmiting 
    // it again for each client to handle
    socket.on('chat message', (msgData) => {
        io.emit('chat message', msgData);
    });
});
