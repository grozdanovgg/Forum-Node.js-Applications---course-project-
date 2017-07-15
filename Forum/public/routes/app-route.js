const { Router } = require('express');
const database = require('../../database/mongodb');
const connectionString = 'mongodb://localhost/items-db';

const attach = (app) => {
    const db = new database(connectionString);
    const router = new Router();
    router
        .get('/', (req, res) => {
            res.render('home');
        })
        .get('/test', (req, res) => {
            res.render('test');
        })
        .get('/posts', (req, res) => {
            db.showAll('posts')
                .then((posts) =>
                    res.render('showposts', { posts }));
        });


    app.use('/', router);
}

module.exports = attach;