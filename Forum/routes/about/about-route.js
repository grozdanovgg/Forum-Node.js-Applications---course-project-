const { Router } = require('express');
const controller = require('./about-controller');

const attach = (app) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            // res.send(controller);
            controller.showAbout(req, res);
        });

    app.use('/about', router);
};

module.exports = attach;
