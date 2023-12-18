const express = require('express')
const router = express.Router()
const { storage } = require('../config/cloudinary')
const multer = require('multer')
const { Authorize } = require('../utils/authJwt')
const { ProfileController } = require('../controller/admin/profile.controller')
const upload = multer({ storage })

router.post('/profiles', Authorize.verifyAccessToken,  upload.fields([{ name : 'coverImage', maxCount : 1 }, { name : 'profileImage', maxCount : 1 }]) , ProfileController.addProfile)

router.get('/profiles/view-profile', Authorize.verifyAccessToken, ProfileController.viewProfile)

router.patch('/profiles/update-profile', Authorize.verifyAccessToken, ProfileController.updateProfile)


module.exports = router