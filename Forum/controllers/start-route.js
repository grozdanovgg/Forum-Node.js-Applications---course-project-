const { Router } = require('express');

const attach = (app, db) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            let user = req.user;
            if (user) {
                console.log('here');
                app.locals.currentUser = user;
            } else {
                user = req.app.locals.currentUser;
            }
            db.showAll('categories')
                .then((categories) => {
                    res.render('start', {
                        categories,
                        user,
                    });
                })
                .catch((error) => {
                    const message = 'There is a problem with the connection.';
                    res.render('404', { user, message });
                });
        });
    app.use('/', router);
};

module.exports = attach;
