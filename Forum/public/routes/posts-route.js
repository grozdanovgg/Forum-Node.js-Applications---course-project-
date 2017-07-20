const { Router } = require('express');
const pageHandler = require('../paging/paging');

const attach = (app, db) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            const user = req.user;
            const page = pageHandler
                .choosePage(req.query.page);

            db.showAll('posts')
                .then((posts) => {
                    const size = 5;
                    const pagingResult = pageHandler
                        .handle(posts, page, size, res);

                    const showposts = pagingResult.filteredCollection;
                    const showPages = pagingResult.navigationNumbers;
                    const pagesNum = pagingResult.numberOfPages;

                    res.render('showposts', {
                        showposts,
                        page,
                        showPages,
                        pagesNum,
                        user,
                    });
                });
        })
        .get('/:category', (req, res) => {
            const user = req.user;
            const category = req.params.category;

            const page = pageHandler
                .choosePage(req.query.page);

            db.showAll(category)
                .then((posts) => {
                    const size = 5;
                    const pagingResult = pageHandler
                        .handle(posts, page, size, res);

                    const showposts = pagingResult.filteredCollection;

                    const showPages = pagingResult.navigationNumbers;

                    const pagesNum = pagingResult.numberOfPages;

                    res.render('showposts', {
                        showposts,
                        page,
                        showPages,
                        pagesNum,
                        user,
                    });
                });
        });

    app.use('/posts', router);
};

module.exports = attach;
