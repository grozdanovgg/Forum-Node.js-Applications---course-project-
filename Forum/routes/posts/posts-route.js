const { Router } = require('express');
const controller = require('./posts-controller');

const attach = (app, db) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/:category', (req, res) => {
            controller.showPosts(req, res, db);
        })
        .post('/:category', (req, res) => {
            controller.createPost(req, res, db);
        })
        .get('/:category/:id', (req, res) => {
            controller.showPost(req, res, db);
        })
        .post('/:category/:id', (req, res) => {
            controller.createComment(req, res, db);
        });

    app.use('/posts', router);
};

module.exports = attach;
