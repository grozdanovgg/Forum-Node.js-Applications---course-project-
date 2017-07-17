const { Router } = require('express');
const pageHandler = require('../paging/paging');

const attach = (app, db) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            const page = pageHandler
                .choosePage(req.query.page);

            db.showAll('themes')
                .then((themes) => {
                    const size = 8;
                    const pagingResult = pageHandler
                        .handle(themes, page, size, res);

                    const showThemes = pagingResult.filteredCollection;
                    const navigationNumbers = pagingResult.navigationNumbers;
                    const pagesNum = pagingResult.numberOfPages;
                    res.render('home', {
                        showThemes,
                        page,
                        navigationNumbers,
                        pagesNum,
                    });
                });
        })
        .get('/test', (req, res) => {
            res.render('test');
        })
        .get('/posts', (req, res) => {
            const page = pageHandler
                .choosePage(req.query.page);

            db.showAll('posts')
                .then((posts) => {
                    const size = 5;
                    const pagingResult = pageHandler
                        .handle(posts, page, size, res);

                    const showposts = pagingResult.filteredCollection;
                    const showPages = pagingResult.navigationNumbers;
                    const pagesNum = pagingResult.numberOfPages;
                    res.render('showposts', {
                        showposts,
                        page,
                        showPages,
                        pagesNum,
                    });
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
                    const message = 'There was a problem with registering...';
                    res.render('postRegister', { message });
                });
            });
        });


    app.use('/', router);
};

module.exports = attach;
