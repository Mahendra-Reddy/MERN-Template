const express = require('express')
const productController = require('../controllers/productControllers')

const router = express.Router()

router.get('/', productController.get)
router.get('/:id', productController.getById)
router.post('/', productController.set)
router.get('/search/id?', productController.filter)


module.exports = router