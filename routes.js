let express = require("express");
let router = express.Router();

let controller = require("./controllers/controller");

router.get("/", controller.coursesPage);

router.get("/login", controller.loginPage);
router.post("/login", controller.login);

router.get("/add/:id", controller.addToCart);
router.get("/remove/:i", controller.removeFromCart);

router.get("/cart", controller.cartPage);

module.exports = router;
