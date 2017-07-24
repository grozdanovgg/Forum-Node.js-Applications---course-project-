const { Router } = require('express');
// const pageHandler = require('../paging/paging');

const attach = (app) => {
    const router = new Router();
    router
        .get('/', (req, res) => {

            res.render('about');
        });

    app.use('/about', router);
};
module.exports = attach;
