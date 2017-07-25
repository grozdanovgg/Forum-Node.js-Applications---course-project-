const { Router } = require('express');

const attach = (app, db) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            const user = req.user;
            db.showAll('categories')
                .then((categories) => {
                    // console.log(categories);
                    // console.log(user);
                    res.render('start', {
                        categories,
                        user,
                    });
                })
                .catch((error) => {
                    res.render('404');
                });
        });
    app.use('/', router);
};

module.exports = attach;
