const { Router } = require('express');

const attach = (app, db) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            const user = req.user;
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
