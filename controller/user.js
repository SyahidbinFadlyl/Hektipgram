const { User, Profile, Post, Comment, Tag } = require("../models")
const bcrypt = require('bcryptjs')

class Controller {
    static register(req, res) {
        res.render('register')
    }

    static postRegister(req, res) {
        const { fullName, gender, dateOfBirth, userName, email, password } = req.body
        User.create({ userName, email, password })
            .then(user => {
                console.log(user.id);
                return Profile.create({ fullName, gender, dateOfBirth, UserId: user.id })
            })
            .then(userProfile => {
                res.send("sukses nambah user")
            })
            .catch(err => {
                res.send(err)
            })
    }

    static login(req, res) {
        res.render('login', { error: req.query.err })
    }

    static postLogin(req, res) {
        const { email, password } = req.body
        const inv = `invalid credentials`
        User.findOne({ where: { email } })
            .then(user => {
                if (user && user.length !== 0) {
                    if (bcrypt.compareSync(password, user.password)) {
                        return res.redirect('/home')
                    } else {
                        return res.redirect(`/?err=${inv}`)
                    }
                } else {
                    return res.redirect(`/?err=${inv}`)
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static home(req, res) {
        Post.findAll({ include: { all: true, nested: true } })
            .then(post => {
                res.render('home', { post })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })

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