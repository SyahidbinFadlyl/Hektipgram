const Controller = require("../controller/user")
const router = require("express").Router()

router.get("/", Controller.login)
router.post("/", Controller.postLogin)

router.get("/register", Controller.register)
router.post("/register", Controller.postRegister)

router.use((req, res, next) => {
    if (!req.session.userId) {
        const err = "LOGIN DULU!"
        return res.redirect((`/?err=${err}`))
    } else {
        next()
    }
})

router.get("/home", Controller.home)
router.get("/post", Controller.addPost)
router.get("/comment/:PostId", Controller.commentSection)

module.exports = router