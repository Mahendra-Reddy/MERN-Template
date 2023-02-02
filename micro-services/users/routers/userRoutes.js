const express = require('express')
const userController = require('../controllers/userControllers')

const router = express.Router()

router.get('/', userController.get)

router.get('/:id', userController.getById)

router.post('/', userController.set)

router.put('/:id', userController.update)

router.delete('/:id', userController.remove)


module.exports = router