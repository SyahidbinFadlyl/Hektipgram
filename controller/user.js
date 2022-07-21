const { User, Profile } = require("../models")


class Controller {
    static login(req, res) {
        res.render('login')
    }

    static register(req, res) {
        res.render('register')
    }

    static postRegister(req, res) {
        const {fullName, gender, dateOfBirth, userName, email, password} = req.body
        User.create({userName, email, password})
        .then(user => {
            console.log(user.id);
            return Profile.create({fullName, gender, dateOfBirth, UserId:user.id})
        })
        .then(userProfile => {
            res.send("sukses nambah user")
        })
        .catch(err => {
            res.send(err)
        })
    }

    static home(req, res) {
        res.render('home')
    }

    static addPost(req, res) {

    }

    static postAddPost(req, res) {

    }

    static editPost(req, res) {

    }

    static postEditPost(req, res) {

    }

    static deletePost(req, res) {

    }


}

module.exports = Controller