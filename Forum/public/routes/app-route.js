const { Router } = require('express');

const attach = (app) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            res.render('home');
        })
        .get('/test', (req, res) => {
            res.render('test');
        })
    app.use('/', router);
}

module.exports = attach;