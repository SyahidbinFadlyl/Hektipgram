const User = require("../controller/user")
const router = require("express").Router()

router.get("/", User.login)
router.get("/home", User.home)


module.exports = router 