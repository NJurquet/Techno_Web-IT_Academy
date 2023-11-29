let express = require("express");
let router = express.Router();

let controller = require("./controllers/controller");

router.get("/", controller.coursesPage);

router.get("/login", controller.loginPage);

router.post("/login", controller.login);

module.exports = router;
