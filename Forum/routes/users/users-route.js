const { Router } = require('express');
const controller = require('./users-controller');
// const ObjectID = require('mongodb').ObjectID;
// const pageHandler = require('../paging/paging');

const attach = (app, db) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/:username', (req, res) => {
            controller.showUser(req, res, db);
        })
        .get('/:username/settings', (req, res) => {
            controller.showUserSettings(req, res, db);
        })
        .get('/:username/:id', (req, res) => {
            controller.showUserPost(req, res, db);
        })
        .post('/:username/:id', (req, res) => {
            controller.createUserComment(req, res, db);
        });

    app.use('/users', router);
};

module.exports = attach;
