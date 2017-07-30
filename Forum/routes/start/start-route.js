const { Router } = require('express');
const controller = require('./start-controller');

const attach = (app, db) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            controller.showHome(req, res, app, db);
        });
    app.use('/', router);
};

module.exports = attach;
