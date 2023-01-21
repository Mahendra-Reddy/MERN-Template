const Blog = require("../models/blog")

const get = (req, res) => {
    Blog.find().then(result => {
        res.send(result)
    }).catch(err => console.log(err))
}

const getById = (req, res) => {
    Blog.findById(req.params.id).then(result => {
        res.send(result)
    }).catch(err => console.log(err))
}

const set = (req, res) => {
    const blog = new Blog(req.body)
    blog.save().then(result => res.send(result)).catch(err => console.log(err))
}

const update = (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body)
    .then(() => Blog.findById(req.params.id).then(result => res.send(result)))
    .catch(err => console.log(err))
}

const remove =  (req, res) => {
    Blog.findByIdAndDelete(req.params.id).then(result => {
        res.send(result)
    }).catch(err => console.log(err))
}

module.exports = {
    get,
    getById,
    set,
    update,
    remove
}