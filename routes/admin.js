const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')
const middleware = require('../middleware/authJwt')

router.get('/api/dashboard', middleware.Authorize.verifyToken, controller.dashboardController.AdminDashboard.getData)

module.exports = router