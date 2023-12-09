const express = require('express')
const router = express.Router()
const { AdminDashboard } = require('../controller/admin/dashboard.controller')
const { Authorize } = require('../utils/authJwt')

router.get('/dashboard', Authorize.verifyAccessToken, AdminDashboard.DashboardData)

module.exports = router