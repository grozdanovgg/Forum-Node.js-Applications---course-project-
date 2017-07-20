const { Router } = require('express');
// const pageHandler = require('../paging/paging');

const attach = (app, database) => {
    const router = new Router();
    router
        .get('/:email', (req, res) => {
            const user = req.user;
            if (user.email === req.params.email) {
                res.render('myProfile', { user });
            } else {
                res.render('otherProfile');
            }
        });

    app.use('/users', router);
}

module.exports = attach;
