const { Router } = require('express');
const passport = require('passport');

const attach = (app) => {
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
            return res.render('register');
        });

    app.use('/auth', router);
};

module.exports = attach;
