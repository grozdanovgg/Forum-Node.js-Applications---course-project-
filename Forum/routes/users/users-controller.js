const controller = {
    showUser(req, res, db) {
        const user = req.app.locals.currentUser;
        const username = req.params.username;
        db.find('users', { username: username }).then((users) => {
                const foundUser = users[0];
                if (!foundUser) {
                    const message = 'There was a problem finding the user.';
                    res.status(404).render('404', { user, message });
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
                res.status(404).render('404', { user, message });
            });
    },

    showUserSettings(req, res, db) {
        const user = req.app.locals.currentUser;
        if (!user) {
            const message = 'User is not logged in.';
            return res.status(404).render('404', { user, message });
        }
        const username = req.params.username;
        return db.find('users', { username: username }).then((users) => {
                const foundUser = users[0];
                if (!foundUser) {
                    const message = 'There was a problem finding the user.';
                    return res.status(404).render('404', { user, message });
                }

                return res.render('settings', { user });
            })
            .catch(() => {
                const message = 'There was a problem finding the user.';
                return res.status(404).render('404', { user, message });
            });
    },
    showUserPost(req, res, db) {
        const user = req.app.locals.currentUser;
        const id = req.params.id;
        const username = req.params.username;
        db.find('users', { username }).then((u) => {
                const foundUser = u[0];
                const post = foundUser.posts
                    .find((f) => f._id.toString() === id);
                res.render('post', { user, category: post.category, post });
            })
            .catch(() => {
                const message = 'There was a problem finding the post.';
                res.status(404).render('404', { user, message });
            });
    },
    createUserComment(req, res, db) {
        const user = req.app.locals.currentUser;
        if (!user) {
            res.redirect('/auth/login');
        }
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
        db.find('users', { username: username }).then((users) => {
                const foundUser = users[0];
                const post = foundUser.posts
                    .find((f) => f._id.toString() === id);
                post.comments.push(newComment);
                const index = foundUser.posts.indexOf(post.title);
                foundUser.posts.splice(index, 1);
                foundUser.posts.push(post);
                db.update('users', {
                            username: foundUser.username,
                        },
                        foundUser)
                    .then((p) => {
                        res.render('post', {
                            user,
                            category: post.category,
                            post,
                        });
                        db.find('posts/' + post.category, {
                                title: post.title,
                            })
                            .then((posts) => {
                                const newPost = posts[0];
                                newPost.comments.push(newComment);
                                db.update('posts/' + post.category, {
                                        title: post.title,
                                    },
                                    newPost);
                            });
                    });
            })
            .catch(() => {
                const message = 'There was a problem finding the user.';
                res.status(404).render('404', { user, message });
            });
    },
};

// @ts-ignore
module.exports = controller;
