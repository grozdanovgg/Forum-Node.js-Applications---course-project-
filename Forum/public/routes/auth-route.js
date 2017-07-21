const { Router } = require('express');
const passport = require('passport');

const attach = (app, db) => {
    const router = new Router();
    router
        .get('/login', (req, res) => {
            return res.render('login');
        })
        .post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
        }))
        .get('/register', (req, res) => {
            const user = req.user;
            if (user) {
                res
                    .render('404');
            } else {
                res.render('register');
            }
        })
        .post('/register', (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
            const email = req.body.email;
            const repeatpassword = req.body.password_confirm;
            const posts = [];
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
                const newUser = { username, password, email, posts };
                db.insert('users', newUser).then(() => {
                    const message = 'Successfully Registered';
                    res.render('postRegister', { message });
                }).catch(() => {
                    const message = 'There was a problem with registering...';
                    res.render('postRegister', { message });
                });
            });
        });

    app.use('/auth', router);
};

module.exports = attach;
