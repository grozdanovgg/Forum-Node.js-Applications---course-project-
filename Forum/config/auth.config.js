const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local');

const configAuth = (app, database) => {
    passport.use(new Strategy(
        {
            passReqToCallback: true
        },
        (req, username, password, done) => {
            const email = req.body.email;
            if(!email) {
            database.find('users', { username: username,
                password: password })
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
                        done(null,  newUser);
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
        done(null, user.email);
    });

    passport.deserializeUser((email, done) => {
        database.find('users', { email: email })
            .then((users) => {
                if (users.length < 1) {
                    return done('No such user found.----');
                } else if (users.length > 1) {
                    return done('There is more than one user with this id');
                }
                return done(null, users[0]);
            })
            .catch(() => done('Problem with id'));
    });
};

module.exports = configAuth;
