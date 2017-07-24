const { Router } = require('express');
const pageHandler = require('../models/paging');

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
            // console.log(category);

            const page = pageHandler
                .choosePage(req.query.page);

            db.showAll('posts/' + category)
                .then((posts) => {
                    const size = 5;
                    const pagingResult = pageHandler
                        .handle(posts, page, size, res);

                    const showposts = pagingResult.filteredCollection;

                    const showPages = pagingResult.navigationNumbers;

                    const pagesNum = pagingResult.numberOfPages;

                    res.render('showposts', {
                        category,
                        showposts,
                        page,
                        showPages,
                        pagesNum,
                        user,
                    });
                })
                .catch(() => {
                    res.render('404');
                });
        })
        .post('/:category', (req, res) => {
            const user = req.user;
            const category = req.params.category;
            const title = req.body.title;
            const post = req.body.post;
            const page = pageHandler
                .choosePage(req.query.page);
            const newPost = {
                title: title,
                post: post,
                author: user.username,
                category: category,
                comments: [],
            };
            db.insert('posts/' + category, newPost)
                .then((posts) => {
                    const size = 5;
                    const pagingResult = pageHandler
                        .handle(posts, page, size, res);

                    const showposts = pagingResult.filteredCollection;

                    const showPages = pagingResult.navigationNumbers;

                    const pagesNum = pagingResult.numberOfPages;
                    res.render('showposts', {
                        category,
                        showposts,
                        page,
                        showPages,
                        pagesNum,
                        user,
                    });
                    db.find('users', { username: user.username }).then((users) => {
                        const changingUser = users[0];
                        console.log(changingUser);
                        changingUser.posts.push(newPost);
                        db.update('users', { username: user.username }, changingUser);
                        //db.delete('users', { username: user.username })
                        //    .then(() => db.insert('users', changingUser));
                    });
                });
        })
        .get('/:category/:id', (req, res) => {
            const user = req.user;
            const category = req.params.category;
            const id = req.params.id;
            db.findById('posts/' + category, id).then((posts) => {
                console.log(posts);
                if (posts.length !== 1) {
                    res.render('404');
                } else {
                    res.render('post', { user, category, post: posts[0] });
                }
            });
        })
        .post('/:category/:id', (req, res) => {
            const user = req.user;
            const category = req.params.category;
            const id = req.params.id;
            const date = new Date();
            const text = req.body.text;
            const newComment = {
                category,
                author: user.username,
                category: category,
                text,
                date,
            };
            db.findById('posts/' + category, id).then((posts) => {
                const newPost = posts[0];
                newPost.comments.push(newComment);
                console.log(newComment);
                db.update('posts/' + category, { title: newPost.title }, newPost).then((p) => {
                    res.render('post', { user, category, post: newPost });
                });
            });
        });

    app.use('/posts', router);
};

module.exports = attach;
