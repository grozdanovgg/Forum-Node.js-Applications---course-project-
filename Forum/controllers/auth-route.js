const { Router } = require('express');
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: 'Forum/static/images/profile/' });


const attach = (app, db) => {
    const router = new Router();
    router
        .get('/login', (req, res) => {
            return res.render('login', { message: req.flash('error') });
        })
        .post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
        }))
        .get('/register', (req, res) => {
            const user = req.user;
            if (user) {
                // const message = 'You are allready signed in.';
                res.render('register', { message: req.flash('error') });
            } else {
                res.render('register', { message: req.flash('error') });
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
            if (user) {
                res.render('picture', { user });
            } else {
                const message = 'You should be register, to upload picture.';
                res.render('404', { user, message });
            }
        })
        .post('/profilePicture', upload.any(), (req, res) => {
            const user = req.user;
            if (!user) {
                res.redirect('/auth/login');
            }
            if (req.files.length > 0) {
                db.find('users', { username: user.username })
                    .then((users) => {
                        const changingUser = users[0];
                        changingUser.pictureName = req.files[0].filename;
                        db.update('users', {
                                username: user.username,
                            }, changingUser)
                            .then(() => {
                                res.redirect('/');
                            })
                            .catch(() => {
                                const message = 'Problem with database...';
                                res.render('404', { message });
                            });
                    });
            } else {
                res.redirect('/');
            }
        });

    app.use('/auth', router);
};

module.exports = attach;
