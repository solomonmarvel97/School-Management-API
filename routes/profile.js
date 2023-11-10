const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')
const { storage } = require('../config/cloudinary')
const multer = require('multer')
const upload = multer({ storage })
const middleware = require('../middleware/authJwt')

router.post('/api/profiles', middleware.Authorize.verifyToken,  upload.fields([{ name : 'coverImage', maxCount : 1 }, { name : 'profileImage', maxCount : 1 }]) ,controller.profileController.Profile.addProfile)

router.get('/api/profiles/view-profile', middleware.Authorize.verifyToken, controller.profileController.Profile.viewProfile)

router.patch('/api/profiles/update-profile', middleware.Authorize.verifyToken, controller.profileController.Profile.updateProfile)


module.exports = router