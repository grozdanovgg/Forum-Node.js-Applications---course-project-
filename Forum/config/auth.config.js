const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local');

const configAuth = (app, database) => {
    passport.use(new Strategy(
        (username, password, done) => {
            database.find('users', { username: username })
                .then((users) => {
                    if (users.length < 1) {
                        return done('No such user found.');
                    } else if (users.length > 1) {
                        return done('There is more than one user with this username');
                    } else {
                        console.log(users[0]);
                        return done(null, users[0]);
                    }
                })
                .catch((ex) => {
                    return done(ex);
                });
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
        console.log('user id = ' + user._id);
        done(null, user._id);
    });

    passport.deserializeUser((_id, done) => {
        console.log('second id = ' + _id);
        database.findOne('users', _id)
            .then((users) => {
                if (users.length < 1) {
                    return done('No such user found.----');
                } else if (users.length > 1) {
                    return done('There is more than one user with this id');
                } else {
                    return done(null, users[0]);
                }
            })
            .catch(() => done('Problem with id'));
    });

};

module.exports = configAuth;
