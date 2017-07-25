const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// let hashPhrase;
// bcrypt.hash(myPlaintextPassword, saltRounds)
//     .then(function(hash) {
//         console.log(hash);
//         hashPhrase = hash;
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hashPhrase)
//     .then(function(res) {
//         // res == true
//         console.log(res);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
// bcrypt.compare(someOtherPlaintextPassword, hashPhrase).then(function(res) {
//     // res == false
//     console.log(res);
// });

const configAuth = (app, database) => {
    passport.use(new Strategy({
            passReqToCallback: true,
        },
        (req, username, password, done) => {
            const email = req.body.email;
            if (!email) {
                database.find('users', {
                        username: username,
                        password: password
                    })
                    .then((users) => {
                        if (users.length < 1) {
                            return;
                        } else if (users.length > 1) {
                            return;
                        }
                        return done(null, users[0]);
                    })
                    .catch((ex) => {
                        return done(ex);
                    });
            } else {
                const username = req.body.username;
                const password = req.body.password;
                const repeatpassword = req.body.password_confirm;
                const posts = [];
                if (!password || !username || !email || !repeatpassword) {
                    const message = 'All fields are required!';
                    done(message);
                }

                if (password !== repeatpassword) {
                    const message = 'Passwords are not the same!';
                    done(message);
                }

                database.find('users', { 'username': username }).then((users) => {
                    if (users.length > 0) {
                        const message = 'There is user with this username!';
                        done(message);
                    }
                    const newUser = { username, password, email, posts };
                    database.insert('users', newUser).then(() => {
                        const message = 'Successfully Registered';
                        done(null, newUser);
                    }).catch(() => {
                        const message = 'There was a problem with registering...';
                        done(message);
                    });
                });
            }
        }
    ));

    app.use(cookieParser());
    app.use(session({
        secret: 'Purple Unicorn',
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        database.findById('users', id)
            .then((users) => {
                if (users.length < 1) {
                    return done('No such user found.----');
                } else if (users.length > 1) {
                    return done('There is more than one user with this id');
                }
                return done(null, users[0]);
            });
    });
};

module.exports = configAuth;
