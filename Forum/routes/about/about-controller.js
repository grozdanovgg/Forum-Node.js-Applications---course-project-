const controller = {
    showAbout(req, res) {
        const user = req.user;
        res.render('about', { user });
    },
};

// @ts-ignore
module.exports = controller;
