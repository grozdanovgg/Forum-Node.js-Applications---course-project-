const controller = {
    showAbout(req, res) {
        const user = req.app.locals.currentUser;
        res.render('about', { user });
    },
};

module.exports = controller;
