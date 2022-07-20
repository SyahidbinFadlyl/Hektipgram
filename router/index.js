const Controller = require("../controller/controller")
const router = require("express").Router()



router.get("/", Controller.login)
router.get("/home", Controller.home)
