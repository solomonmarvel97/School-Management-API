const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const middleware = require('../middleware/authJwt')

router.get('/parents/list-parent', middleware.Authorize.verifyToken, controller.parentController.Parent.listParent)

router.get('/parents/search', middleware.Authorize.verifyToken, controller.parentController.Parent.searchParent)

router.get('/parents/:id', middleware.Authorize.verifyToken, controller.parentController.Parent.getParent)

module.exports = router