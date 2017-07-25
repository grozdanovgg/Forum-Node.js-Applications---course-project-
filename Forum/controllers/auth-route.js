const { Router } = require('express');
const passport = require('passport');
var multer  = require('multer')
const upload = multer({dest: 'Forum/static/images/profile/'});

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
            successRedirect: '/auth/profilePicture',
            failureRedirect: '/auth/register',
            failureFlash: true,
        }))
        .get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        })
        .get('/profilePicture', (req, res) => {
            const user = req.user;
            if(user) {
                res.render('picture', {user});
            } else {
                const message = 'You should be register, to upload picture.';
                res.render('404', { user, message });
            }
        })
        .post('/profilePicture', upload.any(), (req, res) => {
            const user = req.user;
            if(req.files.length > 0) {
                res.send(req.files[0].filename);
                db.find('users', {username: user.username})
                    .then((users) => {
                        var changingUser = users[0];
                        changingUser.pictureName = req.files[0].filename;
                        db.update('users', {username: user.username}, changingUser);
                    });
            } else {
                res.redirect('/hey');
            }
        });

    app.use('/auth', router);
};

module.exports = attach;
