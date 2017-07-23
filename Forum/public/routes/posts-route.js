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
                        changingUser.posts.push(newPost);
                        db.delete('users', { username: user.username })
                            .then(() => db.insert('users', changingUser));
                    });
                });
        })
        .get('/:category/:title', (req, res) => {
            const user = req.user;
            const category = req.params.category;
            const title = req.params.title;
            db.find('posts/' + category, {title: title}).then((posts)=>{
                console.log(posts);
                if(posts.length!==1) {
                    res.render('404');
                } else {
                    res.render('post',{user, category, post: posts[0]});
                }                    
            });
        });

    app.use('/posts', router);
};

module.exports = attach;
