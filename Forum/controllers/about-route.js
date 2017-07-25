const { Router } = require('express');
// const pageHandler = require('../paging/paging');

const attach = (app) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            const user = req.user;
            res.render('about', { user });
        });

    app.use('/about', router);
};
module.exports = attach;
