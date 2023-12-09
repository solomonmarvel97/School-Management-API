const { uploadToCloudinary } = require('../../config/cloudinary')
const { logger } = require('../../config/logger')
const { AdminService } = require('../../service/admin.service')
const { ProfileService } = require('../../service/profile.service')
const { respond } = require('../../utils/respond')

class ProfileController {

    static async addProfile(req, res) {
        try {
            const { schoolName, email, phone, city, address, languages } = req.body
            const coverImage = req.files.coverImage ? req.files.coverImage[0] : null
            const profileImage = req.files.profileImage ? req.files.profileImage[0] : null
            if (profileImage === null || coverImage === null) {
                return respond(res, 400, 'Both fields are required!')
            }
            const uplaodcoverImage = await uploadToCloudinary(coverImage.path, { resource_type: 'auto' })
            const uploadprofileImge = await uploadToCloudinary(profileImage.path, { resource_type: 'auto' })
            const profile = await service.profileService.createProfile(uplaodcoverImage.secure_url, uploadprofileImge.secure_url, schoolName, email, phone, city, address, languages, req.id)
            if (!profile) {
                return respond(res, 409, 'Profile not created')
            }
            return respond(res, 200, 'Profile created successfully', { profile })
        } catch (err) {
            logger.error(`Failed to create profile ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    static async viewProfile(req, res) {
        try {
            const profile = await ProfileService.getProfile(req.id)
            if (!profile) {
                return respond(res, 409, 'No profile added')
            }
            return respond(res, 200, 'Profile successfully retrieved', { profile })
        } catch (err) {
            logger.error(`Failed to retrieve profile ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    static async updateProfile(req, res) {
        try {
            const { username, password } = req.body
            const profile = await AdminService.updateAdmin(req.id, username, password)
            if (!profile) {
                return respond(res, 409, 'Profile not updated')
            }
            return respond(res, 200, 'Profile successfully updated')
        } catch (err) {
            logger.error(`Failed to update profile ${err}`)
            return respond(res, 500, 'Error updating profile')
        }
    }
}

module.exports = { ProfileController }