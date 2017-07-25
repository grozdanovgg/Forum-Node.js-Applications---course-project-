const { Router } = require('express');
const pageHandler = require('../models/paging');

const attach = (app, db) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            const user = req.user;
            const page = pageHandler
                .choosePage(req.query.page);

            db.showAll('categories')
                .then((categories) => {
                    const size = 8;
                    const pagingResult = pageHandler
                        .handle(categories, page, size, res);

                    const showcategories = pagingResult.filteredCollection;
                    const navigationNumbers = pagingResult.navigationNumbers;
                    const pagesNum = pagingResult.numberOfPages;
                    res.render('home', {
                        showcategories,
                        page,
                        navigationNumbers,
                        pagesNum,
                        user,
                    });
                })
                .catch(() => {
                    const message = 'There is a problem with the connection.';
                    res.render('404', {user, message});
                });
        });

    app.use('/home', router);
};

module.exports = attach;
