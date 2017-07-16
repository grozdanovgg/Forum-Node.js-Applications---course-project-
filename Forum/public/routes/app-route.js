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
            let page = req.query.page;
            if (!page) {
                page = 1;
            } else {
                page = parseInt(page, 10);
            }

            db.showAll('posts')
                .then((posts) => {
                    var i = 1;
                    var showposts = [];
                    const size = 5;
                    var pagesNum = Math.ceil(posts.length / size);
                    if (page < 1 || page > pagesNum) {
                        res.redirect('404');
                    }

                    var index = (i + ((page - 1) * size) - 1)
                    while (index < posts.length && i <= size) {
                        showposts.push(posts[index++]);
                        i++;
                    }
                    const showPages = [];
                    if (page > 1 && page < pagesNum) {
                        showPages.push(page - 1, page, page + 1);
                    } else if (page === 1 && pagesNum > 2) {
                        showPages.push(page, page + 1, page + 2);
                    } else if (page === pagesNum && pagesNum > 2) {
                        showPages.push(page - 2, page - 1, page);
                    } else {
                        for (var j = 1; j <= pagesNum; j += 1) {
                            showPages.push(j);
                        }
                    }
                    console.log(pagesNum);
                    res.render('showposts', { showposts, page, showPages, pagesNum });
                });
        })
        .get('/register', (req, res) => {
            res.render('register');
        })
        .post('/register', (req, res) => { res.send(req.body) });


    app.use('/', router);
}

module.exports = attach;
