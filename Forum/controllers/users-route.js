const { Router } = require('express');
// const ObjectID = require('mongodb').ObjectID;
// const pageHandler = require('../paging/paging');

const attach = (app, database) => {
    const router = new Router();
    router
        .get('/:username', (req, res) => {
            const user = req.user;
            const username = req.params.username;
            database.find('users', { username: username }).then((users) => {
                    const foundUser = users[0];
                    if (!foundUser) {
                        const message = 'There was a problem finding the user.';
                        res.render('404', { user, message });
                    }
                    const posts = foundUser.posts;
                    posts.reverse();
                    if (user && user.username === username) {
                        res.render('profile', {
                            user,
                            foundUser,
                            posts,
                            isMine: true,
                        });
                    } else {
                        res.render('profile', {
                            user,
                            foundUser,
                            posts,
                            isMine: false,
                        });
                    }
                })
                .catch(() => {
                    const message = 'There was a problem finding the user.';
                    res.render('404', { user, message });
                });
        })
        .get('/:username/settings', (req, res) => {
            const user = req.user;
            const username = req.params.username;
            database.find('users', { username: username }).then((users) => {
                    const foundUser = users[0];
                    if (!foundUser) {
                        const message = 'There was a problem finding the user.';
                        res.render('404', { user, message });
                    }

                    res.render('settings', { user });
                })
                .catch(() => {
                    const message = 'There was a problem finding the user.';
                    res.render('404', { user, message });
                });
        })
        .get('/:username/:id', (req, res) => {
            const user = req.user;
            const id = req.params.id;
            const username = req.params.username;
            database.find('users', { username }).then((u) => {
                    const foundUser = u[0];
                    const post = foundUser.posts
                        .find((f) => f._id.toString() === id);
                    res.render('post', { user, category: post.category, post });
                })
                .catch(() => {
                    const message = 'There was a problem finding the post.';
                    res.render('404', { user, message });
                });
        })
        .post('/:username/:id', (req, res) => {
            const user = req.user;
            const id = req.params.id;
            const username = req.params.username;
            const date = new Date();
            const text = req.body.text;
            const newComment = {
                author: user.username,
                img: user.pictureName,
                text,
                date,
            };
            database.find('users', { username: username }).then((users) => {
                    const foundUser = users[0];
                    const post = foundUser.posts
                        .find((f) => f._id.toString() === id);
                    post.comments.push(newComment);
                    const index = foundUser.posts.indexOf(post.title);
                    foundUser.posts.splice(index, 1);
                    foundUser.posts.push(post);
                    database.update('users', {
                                username: foundUser.username,
                            },
                            foundUser)
                        .then((p) => {
                            res.render('post', {
                                user,
                                category: post.category,
                                post,
                            });
                            database.find('posts/' + post.category, {
                                    title: post.title,
                                })
                                .then((posts) => {
                                    const newPost = posts[0];
                                    newPost.comments.push(newComment);
                                    database.update('posts/' + post.category, {
                                            title: post.title,
                                        },
                                        newPost);
                                });
                        });
                })
                .catch(() => {
                    const message = 'There was a problem finding the user.';
                    res.render('404', { user, message });
                });
        });

    app.use('/users', router);
};

module.exports = attach;
