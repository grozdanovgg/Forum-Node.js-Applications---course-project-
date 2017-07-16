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
        .post('/register', (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
            const email = req.body.email;
            const repeatpassword = req.body.password_confirm;
            console.log(username);
            console.log(password);
            console.log(email);
            console.log(repeatpassword);
            if (!password || !username || !email || !repeatpassword) {
                const message = 'All fields are required!';
                res.render('register', { message });
            }

            if (password !== repeatpassword) {
                const message = 'Passwords are not the same!';
                res.render('register', { message });
            }

            db.find('users', { 'username': username }).then((users) => {
                if (users.length > 0) {
                    const message = 'There is user with this username!';
                    res.render('register', { message });
                }
                const newUser = { username, password, email, repeatpassword };
                db.insert('users', newUser).then(() => {
                    const message = 'Successfully Registered';
                    res.render('postRegister', { message });
                }).catch(() => {
                    const message = 'We are sorry, but there was a problem with registering...';
                    res.render('postRegister', { message })
                });

            });
        });


    app.use('/', router);
}

module.exports = attach;
