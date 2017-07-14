const { Router } = require('express');

const attach = (app) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            res.render('home');
        });
    app.use('/', router);
}

module.exports = attach;