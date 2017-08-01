const controller = {
    showHome(req, res, app, db) {
        const user = req.user;
        db.showAll('categories')
            .then((categories) => {
                res.render('start', {
                    categories,
                    user,
                });
            })
            .catch((error) => {
                const message = 'There is a problem with the connection.';
                res.status(404).render('404', { user, message });
            });
    },

};

// @ts-ignore
module.exports = controller;
