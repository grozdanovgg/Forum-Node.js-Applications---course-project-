const { Router } = require('express');
// const pageHandler = require('../paging/paging');

const attach = (app, database) => {
    const router = new Router();
    router
        .get('/:username', (req, res) => {
            const user = req.user;
            if (user.username === req.params.username) {
                res.render('myProfile', { user });
            } else {
                res.render('otherProfile');
            }
        });

    app.use('/users', router);
};

module.exports = attach;
