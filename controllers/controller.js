let Cart = require("../models/cartModel");
let cart = new Cart();

let coursesData = [
    { Id: 1, Name: "HTML/CSS + VSCode", Price: 100, Start: "02-12-23", End: "03-12-23" },
    { Id: 2, Name: "NodeJS", Price: 250, Start: "06-12-23", End: "08-12-23" },
];

// Database connection
var mysql2 = require("mysql2/promise");
var connection = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "it_academy",
    waitForConnections: true, // Wait for a free database connection
    connectionLimit: 10, // Maximum number of simultaneous connections
    queueLimit: 0, // Maximum number of connections in waiting queue (with still some wait time)
});

exports.coursesPage = async (req, res) => {
    try {
        const [rows, fields] = await connection.query("SELECT * FROM course;");
        // console.log(rows[0]);
        // console.log(cart.getCourses());
        // console.log(cart.getCourses().includes(rows[0]));
        // If the user is not connected
        if (req.session.username == undefined) {
            // Render the courses page with the login button
            res.render("coursesPage.ejs", { userConnected: 0, courses: rows, cart: cart.getCourses() });
        } else {
            // Render the courses page without the login button if connected
            res.render("coursesPage.ejs", { userConnected: 1, courses: rows, cart: cart.getCourses() });
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
            }
            res.render("loginPage.ejs", { source: source });
        } else {
            // If the 'Confirm registration' is clicked while being connected
            let message = `You are registered for :`;
            cart.getCourses().forEach(async (course) => {
                message += `<br/>-- ` + course.name;
                await connection.query("INSERT INTO registration SET ?", {
                    username: req.session.username,
                    id: course.id,
                });
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
            cart.getCourses().forEach(async (course) => {
                message += `<br/>-- ` + course.name;
                await connection.query("INSERT INTO registration SET ?", {
                    username: req.session.username,
                    id: course.id,
                });
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
        const [rows, fields] = await connection.query("SELECT * FROM course WHERE id = ?;", courseId);
        cart.addCourse(rows[0]);
        cart.getCourses().sort((a, b) => a.id - b.id);
        console.log(cart.getCourses());
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
