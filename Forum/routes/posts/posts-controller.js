// @ts-ignore
const pageHandler = require('../../models/paging');

const controller = {
    showPosts(req, res, db) {
        const user = req.user;
        const category = req.params.category;

        const page = pageHandler
            .choosePage(req.query.page);
        if (page.error) {
            res.render('404', { message: page.error });
        }

        db.showAll('posts/' + category)
            .then((posts) => {
                posts.reverse();
                const size = 5;
                const pagingResult = pageHandler
                    .handle(posts, page, size);
                if (pagingResult.error) {
                    res.render('404', { message: pagingResult.error });
                }

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
            .catch((err) => {
                const message = 'There was a problem finding the posts: ' + err;
                res.render('404', { user, message });
            });
    },
    createPost(req, res, db, registeredUser) {
        let user = null;
        if (!registeredUser) {
            user = req.user;
        } else {
            user = registeredUser;
        }
        if (!user) {
            res.redirect('/auth/login');
        }
        const category = req.params.category;
        const title = req.body.title;
        const post = req.body.post;
        const page = pageHandler
            .choosePage(req.query.page);
        if (page.error) {
            res.render('404', { message: page.error });
        }
        const newPost = {
            title: title,
            post: post,
            author: user.username,
            img: user.pictureName,
            category: category,
            comments: [],
        };
        db.insert('posts/' + category, newPost)
            .then((posts) => {
                posts.reverse();
                const size = 5;
                const pagingResult = pageHandler
                    .handle(posts, page, size);
                if (pagingResult.error) {
                    res.render('404', { message: pagingResult.error });
                }

                const showposts = pagingResult.filteredCollection;

                const showPages = pagingResult.navigationNumbers;

                const pagesNum = pagingResult.numberOfPages;
                if (!posts[posts.length - 1]) {
                    newPost['0'] = '0';
                } else {
                    const id = posts[posts.length - 1]._id;
                    newPost[id] = id;
                }

                res.render('showposts', {
                    category,
                    showposts,
                    page,
                    showPages,
                    pagesNum,
                    user,
                });
                db.find('users', { username: user.username })
                    .then((users) => {
                        const changingUser = users[0];
                        changingUser.posts.push(newPost);
                        db.update('users', {
                                username: user.username,
                            },
                            changingUser);
                    })
                    .catch((err) => {
                        const message = 'Adding post to user posts: ' + err;
                        res.render('404', { user, message });
                    });
            })
            .catch((err) => {
                const message = 'There was a problem creating the post: ' + err;
                res.render('404', { user, message });
            });
    },
    showPost(req, res, db) {
        const user = req.user;
        const category = req.params.category;
        const id = req.params.id;
        db.findById('posts/' + category, id).then((posts) => {
            if (posts.length !== 1) {
                const message = 'There was a problem finding the post.';
                res.render('404', { user, message });
            } else {
                res.render('post', { user, category, post: posts[0] });
            }
        });
    },
    createComment(req, res, db, registeredUser) {
        let user = null;
        if (!registeredUser) {
            user = req.user;
        } else {
            user = registeredUser;
        }
        if (!user) {
            res.redirect('/auth/login');
        }
        const category = req.params.category;
        const id = req.params.id;
        const date = new Date();
        const text = req.body.text;
        const newComment = {
            author: user.username,
            img: user.pictureName,
            text,
            date,
        };
        db.findById('posts/' + category, id).then((posts) => {
                const newPost = posts[0];
                newPost.comments.push(newComment);
                db.update('posts/' + category, {
                            title: newPost.title,
                        },
                        newPost)
                    .then((p) => {
                        res.render('post', {
                            user,
                            category,
                            post: newPost,
                        });
                        db.find('users', { username: user.username })
                            .then((users) => {
                                const foundUser = users[0];
                                const post = foundUser.posts
                                    .find((f) => f.title === newPost.title);
                                post.comments.push(newComment);
                                const index = foundUser.posts
                                    .indexOf(post.title);
                                foundUser.posts.splice(index, 1);
                                foundUser.posts.push(post);
                                db.update(
                                    'users', {
                                        username: user.username,
                                    }, foundUser);
                            });
                    });
            })
            .catch((err) => {
                const message = 'There was a problem finding the post: ' + err;
                res.render('404', { user, message });
            });
    },
};

// @ts-ignore
module.exports = controller;
