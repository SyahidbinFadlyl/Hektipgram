const Controller = require("../controller/user")
const router = require("express").Router()

router.get("/", Controller.login)
router.get("/register", Controller.register)
router.get("/home", Controller.home)

module.exports = router