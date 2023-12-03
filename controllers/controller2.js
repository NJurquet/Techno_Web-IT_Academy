exports.coursesPage = async (req, res) => {
    if (req.session.username == undefined) {
        try {
            res.render("coursesPage.ejs"); //Button sign in
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            res.render("coursesPage.ejs"); //Without button sign in
        } catch (error) {
            console.log(error);
        }
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
    try {
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
};

exports.registrationPage = async (req, res) => {
    try {
        res.render("registrationPage.ejs");
    } catch (error) {
        console.log(error);
    }
};

exports.registration = async (req, res) => {
    req.session.username = req.body.username;
    console.log(req.session);
    try {
        res.send("You are finally registered !");
    } catch (error) {
        console.log(error);
    }
};
