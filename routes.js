let express = require("express");
let router = express.Router();

let controller = require("./controllers/controller");

// Render the list of all courses
router.get("/", controller.coursesPage);

// Render the login page and get the form username
router.get("/login", controller.loginPage);
router.post("/login", controller.login);

// Add/Remove a course from the cart
router.get("/add/:id", controller.addToCart);
router.get("/remove/:i", controller.removeFromCart);

// Render the cart
router.get("/cart", controller.cartPage);

module.exports = router;
