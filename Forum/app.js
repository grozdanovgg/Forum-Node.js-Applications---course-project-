/* globals __dirname  */
const express = require('express');
const posts = require('./routes/posts/posts-route');
const users = require('./routes/users/users-route');
const auth = require('./routes/auth/auth-route');
const about = require('./routes/about/about-route');
const start = require('./routes/start/start-route');
const path = require('path');
const bodyParser = require('body-parser');
const authConfig = require('./config/auth.config');
const Database = require('./database/mongodb');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const init = (serverConfig) => {
    const app = express();

    const connectionstring = serverConfig.connectionString;
    const sessionSecret = serverConfig.sessionSecret;
    const bodyParserType = serverConfig.bodyParserType;
    const newCategories = serverConfig.categories;
    const registratedUser = serverConfig.user;

    app.use(express.static(__dirname + '../Forum'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'pug');
    app.use('/static', express.static(path.join(__dirname, './static')));
    app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
    if (bodyParserType === 'url') {
        app.use(bodyParser.urlencoded({ extended: true }));
    } else {
        app.use(bodyParser.json());
    }
    app.use(cookieParser('secret'));
    app.use(session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 600000000,
        },
    }));
    app.use(flash());

    const database = new Database(connectionstring);

    /* const category = {
        title: 'Other',
        posts: [],
    };
    database.insert('categories', category);*/
    authConfig(app, database);
    posts(app, database, registratedUser);
    users(app, database);
    auth(app, database);
    about(app);
    start(app, database);

    database.showAll('categories')
        .then((categories) => {
            if (categories.length === 0) {
                for (const category of newCategories) {
                    database.insert('categories', {
                        title: category,
                        bio: '',
                        posts: [],
                    });
                }
            }
        });
    return Promise.resolve(app);
};

module.exports = {
    init,
};

// Tutorial for using database
// database.deleteAll('categories');

// database.showAll('categories').then((th) => console.log(th));
// database.findById('categories','59743f13e392ab1c148c64b0')
// .then((f)=>console.log(f));
// database.update('test',{text:'a'},{text:'b'}).then((d)=>console.log(d));
// database.showAll('users').then(u => console.log(u));
// database.deleteAll('posts/Sport');
// database.deleteAll('users');

// animals, cars, clothing, man, school, space, 
// sport, women, sex, movies, music, programming, work, other,games
// const category1 = {
//     title: 'Games',
//     bio: '',
//     posts: [],
// };
// database.insert('categories', category1).then((c) => console.log(c));

// This drops the database.
// database.showAll('categories').then((categories)=>{
//     for (let i = 0; i < categories.length; i+=1) {
//         database.deleteAll(categories[i].title);
//     }
// });
// database.deleteAll('users');
// database.deleteAll('categories');
// database.delete('categories', {title: 'Games'});
