/* eslint max-len: ["error",  { "ignoreRegExpLiterals": true } ]*/
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local');
const Crypto = require('../models/crypto');

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateUsername(username) {
    const re = /^[0-9A-Za-z\s\-]+$/;
    return re.test(username);
}

const configAuth = (app, database) => {
    passport.use(new Strategy({
            passReqToCallback: true,
        },
        (req, username, password, done) => {
            const email = req.body.email;

            // const password = Crypto.encrypt(rawPassword);
            // console.log(password);
            if (!email) {
                // This is the Login, because no e-mail is sent
                const cryptoPassword = Crypto.encrypt(password).toString();
                console.log(cryptoPassword);
                database.find('users', {
                        username: username,
                        password: cryptoPassword,
                    })
                    .then((users) => {
                        if (users.length < 1) {
                            return;
                        } else if (users.length > 1) {
                            return;
                        }
                        done(null, users[0]);
                    })
                    .catch((ex) => {
                        return done(ex);
                    });
            } else {
                // Register module
                // const username = req.body.username;
                // const password = req.body.password;
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
                if (password.length < 4) {
                    const message = 'Password must be at 4 characters long!';
                    done(message);
                }
                if (!validateEmail(email)) {
                    const message = 'The e-mail is not valid';
                    done(message);
                }
                if (!validateUsername(username)) {
                    const message = 'Username should be alphanumerical';
                    done(message);
                }
                database.find('users', { 'username': username })
                    .then((users) => {
                        if (users.length > 0) {
                            const message = 'There is user with this username!';
                            done(message);
                        }
                        // Here hash newPassword before 
                        // input it in the database:
                        password = Crypto.encrypt(password).toString();
                        const newUser = { username, password, email, posts };
                        database.insert('users', newUser).then(() => {
                            // const message = 'Successfully Registered';
                            done(null, newUser);
                        }).catch(() => {
                            const message = 'Some problem with registering';
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
            })
            .catch((ex) => done(ex));
    });
};

module.exports = configAuth;
