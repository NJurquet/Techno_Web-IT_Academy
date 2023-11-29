exports.coursesPage = async (req, res) => {
    try {
        res.redirect("/login");
    } catch (error) {
        console.log(error);
    }
};

exports.loginPage = async (req, res) => {
    try {
        res.render("loginPage.ejs");
    } catch (error) {
        console.log(error);
    }
};

exports.login = async (req, res) => {
    req.session.username = req.body.username;
    console.log(req.session);
    res.redirect("/login");
};
