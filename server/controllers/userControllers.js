const User = require('../models/user')

const get = (req, res) => {
    User.find()
        .then(result => res.send(result))
        .catch(err => console.log(err))
}

const getById = (req, res) => {
    User.findById(req.params.id)
        .then(result => res.send(result))
        .catch(err => console.log(err))
}

const set = (req, res) => {
    const user = new User(req.body)
    user.save()
        .then(result => res.send(result))
        .catch(err => {
            res.statusCode = 201
            console.log(err)
            res.send()
        })
}

const update = (req, res) => {
    User.findOneAndUpdate(req.params.id, req.body)
        .then(() => User.findById(req.params.id).then(result => res.send(result)))
        .catch(err => console.log(err))
}

const remove = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(result => res.send(result))
        .catch(err => console.log(err))
}


module.exports = {
    get,
    getById,
    update,
    set,
    remove
}