const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')
const middleware = require('../middleware/authJwt')

router.post('/expenses', middleware.Authorize.verifyToken)

router.get('/expenses/list-expense', middleware.Authorize.verifyToken)

router.get('/expenses/search', middleware.Authorize.verifyToken)


module.exports = router