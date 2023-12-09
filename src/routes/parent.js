const express = require('express')
const { Authorize } = require('../utils/authJwt')
const { ParentController } = require('../controller/parent/parent.controller')
const router = express.Router()

router.get('/parents/list-parent', Authorize.verifyAccessToken, ParentController.listParent)

router.get('/parents/search', Authorize.verifyAccessToken, ParentController.searchParent)

router.get('/parents/:id', Authorize.verifyAccessToken, ParentController.getParent)

module.exports = router