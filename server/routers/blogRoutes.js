const express = require('express')
const blogController = require('../controllers/blogControllers')

const router = express.Router();


router.get('/', blogController.get)

router.get('/:id', blogController.getById)

router.post('/', blogController.set)

router.put('/:id', blogController.update)

router.delete('/:id', blogController.remove)

module.exports = router