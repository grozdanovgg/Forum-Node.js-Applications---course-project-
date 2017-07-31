const controller = {
    showHome(req, res, app, db) {
        let user = req.user;
        if (user && !app.locals.currentUser) {
            app.locals.currentUser = user;
        } else {
            user = req.app.locals.currentUser;
        }
        db.showAll('categories')
            .then((categories) => {
                res.render('start', {
                    categories,
                    user,
                });
            })
            .catch((error) => {
                const message = 'There is a problem with the connection.';
                res.render('404', { user, message });
            });
    },

};

module.exports = controller;
