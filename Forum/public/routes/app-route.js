const { Router } = require('express');
const pageHandler = require('../paging/paging');

const attach = (app, db) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            const user = req.user;
            console.log('---current user---');
            console.log(user);
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
                    const showcategories = [];
                    page = 1;
                    const navigationNumbers = [];
                    const pagesNum = 1;
                    res.render('home', {
                        showcategories,
                        page,
                        navigationNumbers,
                        pagesNum,
                        user,
                    });
                });
        });

    app.use('/', router);
};

module.exports = attach;
