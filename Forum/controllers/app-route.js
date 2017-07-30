const { Router } = require('express');
const pageHandler = require('../models/paging');

const attach = (app, db) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            const user = req.app.locals.currentUser;
            const page = pageHandler
                .choosePage(req.query.page);
            if (page.error) {
                res.render('404', { message: page.error });
            }

            db.showAll('categories')
                .then((categories) => {
                    const size = 8;
                    const pagingResult = pageHandler
                        .handle(categories, page, size);
                    if (pagingResult.error) {
                        res.render('404', { message: pagingResult.error });
                    }

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
                    res.render('404', { user, message });
                });
        });

    app.use('/home', router);
};

module.exports = attach;
