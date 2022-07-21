const { User, Profile, Post, Comment, Tag } = require("../models")
const bcrypt = require('bcryptjs')
const { timeSince } = require("../helper/helper")

class Controller {
    static register(req, res) {
        res.render('register')
    }

    static postRegister(req, res) {
        const { fullName, gender, dateOfBirth, userName, email, password } = req.body
        User.create({ userName, email, password })
            .then(user => {
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
                        req.session.userId = user.id;
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
        Post.findAll({
            include: { all: true, nested: true },
            order: [["createdAt", "desc"]]
        })
            .then(post => {
                res.render('home', { post, timeSince })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })

    }

    static addPost(req, res) {
        Tag.findAll()
            .then(tag => {
                res.render('add-post', { user: req.session.userId, tag })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postAddPost(req, res) {
        let { TagId, UserId, caption } = req.body
        Post.create({ caption, imageUrl: req.file.path, like: 0, UserId, TagId })
            .then((_) => {
                res.redirect('/home')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static commentSection(req, res) {
        const id = +req.params.PostId
        const userId = req.session.userId
        Post.findByPk(id, { include: { all: true, nested: true } })
            .then(post => {
                res.render('post-comment', { post, timeSince, UserId: userId })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static likePost(req, res) {
        const id = +req.params.id
        Post.increment("like", { by: 1, where: { id: id } })
            .then(post => {
                res.redirect("/home")
            })
            .catch(err => {
                res.send(err)
            })
    }

    static unlikePost(req, res) {
        const id = +req.params.id
        Post.decrement("like", { by: 1, where: { id: id } })
            .then(post => {
                res.redirect("/home")
            })
            .catch(err => {
                res.send(err)
            })
    }

    static profile(req, res) {
        User.findByPk(+req.session.userId, { include: { all: true } })
            .then(user => {
                res.render('profile', { user })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editProfile(req, res) {
        Profile.findByPk(+req.params.id, { include: User })
            .then(profile => {
                res.render('edit-profile', { profile })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postProfile(req, res) {
        let { fullName, gender, dateOfBirth, UserId, userName, email } = req.body
        Profile.update({ fullName, gender, dateOfBirth, UserId }, { where: { id: +req.params.id } })
            .then((_) => {
                return User.update({ userName, email }, { where: { id: +UserId } })
            })
            .then((_) => {
                res.redirect('/profile')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addCommentPostId(req, res) {
        const { PostId, userId } = req.params
        const { comment } = req.body
        Comment.create({ comment, PostId, UserId: userId })
            .then(result => {
                res.redirect(`/comment/${PostId}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editPost(req, res) {
        //tes
    }

    static postEditPost(req, res) {

    }

    static deletePost(req, res) {

    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) return res.send(err)
            else return res.redirect('/')
        })
    }

}

module.exports = Controller