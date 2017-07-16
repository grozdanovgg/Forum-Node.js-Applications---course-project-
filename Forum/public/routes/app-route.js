const { Router } = require('express');
const Database = require('../../database/mongodb');
const connectionString = 'mongodb://localhost/items-db';

const attach = (app) => {
    const db = new Database(connectionString);
    const router = new Router();
    router
        .get('/', (req, res) => {
            res.render('home');
        })
        .get('/test', (req, res) => {
            res.render('test');
        })
        .get('/posts', (req, res) => {
            let page = req.query.page;
            if (!page) {
                page = 1;
            } else {
                page = parseInt(page, 10);
            }

            db.showAll('posts')
                .then((posts) => {
                    let i = 1;
                    const showposts = [];
                    const size = 5;
                    let index = (i + ((page - 1) * size) - 1);
                    while (index < posts.length && i <= size) {
                        showposts.push(posts[index++]);
                        i++;
                    }
                    console.log(posts);
                    res.render('showposts', { showposts });
                });
        })
        .get('/register', (req, res) => {
            res.render('register');
        })
        .post('/register', (req, res) => {
            res.send(req.body);
        });


    app.use('/', router);
};

module.exports = attach;
