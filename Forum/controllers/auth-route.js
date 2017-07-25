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
                const message = 'You are awready signed in.'
                res
                    .render('404', {message});
            } else {
                res.render('register');
            }
        })
        .post('/register', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/register',
            failureFlash: true,
        }));

    app.use('/auth', router);
};

module.exports = attach;
