let Cart = require("../models/cartModel");
let cart = new Cart();

let coursesData = [
    { Id: 1, Name: "HTML/CSS + VSCode", Price: 100, Start: "02-12-23", End: "03-12-23" },
    { Id: 2, Name: "NodeJS", Price: 250, Start: "06-12-23", End: "08-12-23" },
];

exports.coursesPage = async (req, res) => {
    try {
        // If the user is not connected
        if (req.session.username == undefined) {
            //TODO Select courses from database
            // Render the courses page with the login button
            res.render("coursesPage.ejs", { userConnected: 0, courses: coursesData, cart: cart.getCourses() });
        } else {
            // Render the courses page without the login button if connected
            res.render("coursesPage.ejs", { userConnected: 1, courses: coursesData, cart: cart.getCourses() });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.cartPage = async (req, res) => {
    try {
        res.render("cartPage.ejs", { cart: cart.getCourses() });
    } catch (error) {
        console.log(error);
    }
};

exports.loginPage = async (req, res) => {
    try {
        // If 'Log in' button is clicked or 'Confirm registration' is clicked while not being connected
        if (req.session.username == undefined) {
            source = "";
            // If the user come from the 'Confirm registration' button
            if (req.query.source != undefined) {
                source = "?source=" + req.query.source;
                console.log(source);
            }
            res.render("loginPage.ejs", { source: source });
        } else {
            // If the 'Confirm registration' is clicked while being connected
            let message = `You are registered for :`;
            cart.getCourses().forEach((course) => {
                message += `<br/>-- ` + course.Name;
                //TODO Save username and course Id to database
            });
            res.send(message);
            cart.clear();
        }
    } catch (error) {
        console.log(error);
    }
};

exports.login = async (req, res) => {
    try {
        req.session.username = req.body.username;
        console.log(req.session);
        // If comes from 'Confirm registration', render directly the confirmation page
        if (req.query.source != undefined) {
            let message = `You are registered for :`;
            cart.getCourses().forEach((course) => {
                message += `<br/>-- ` + course.Name;
                //TODO Save username and course Id to database
            });
            res.send(message);
            cart.clear();
        } else {
            // If comes from 'Log in', redirect to the list of all courses
            res.redirect("/");
        }
    } catch (error) {
        console.log(error);
    }
};

exports.addToCart = async (req, res) => {
    try {
        let courseId = req.params.id;
        cart.addCourse(coursesData[courseId - 1]);
        cart.getCourses().sort((a, b) => a.Id - b.Id);
        console.log(cart.getCourses());
        //TODO Select course with Id and add to cart
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
};

exports.removeFromCart = (req, res) => {
    try {
        let courseId = req.params.i;
        cart.removeCourse(courseId);
        console.log(cart.getCourses());
        res.redirect("/cart");
    } catch (error) {
        console.log(error);
    }
};
