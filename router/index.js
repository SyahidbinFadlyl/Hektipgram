const Controller = require("../controller/user")
const router = require("express").Router()

router.get("/", Controller.login)
router.post("/", Controller.postLogin)

router.get("/register", Controller.register)
router.post("/register", Controller.postRegister)
router.get("/home", Controller.home)

module.exports = router