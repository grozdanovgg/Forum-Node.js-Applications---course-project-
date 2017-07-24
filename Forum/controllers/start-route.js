const { Router } = require('express');
const pageHandler = require('../models/paging');

const attach = (app, db) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            db.showAll('categories')
                .then((categories) => {
                    // console.log(categories);
                    res.render('start', {
                        categories,
                    });
                })
                .catch((error) => {
                    res.render('404');
                });
        });
    app.use('/', router);
};

module.exports = attach;
