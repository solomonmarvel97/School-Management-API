const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')
const { storage } = require('../config/cloudinary')
const multer = require('multer')
const upload = multer({ storage })

router.post('/profile', upload.fields([{ name : 'coverImage', maxCount : 1 }, { name : 'profileImage', maxCount : 1 }]) ,controller.profileController.Profile.addProfile)

.get('/profile', controller.profileController.Profile.viewProfile)

.patch('/profile', controller.profileController.Profile.updateProfile)


module.exports = router