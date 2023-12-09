const { logger } = require('../config/logger')
const { AdminProfile } = require('../model/admin.profile.model')

class ProfileService {
    static async createProfile(profileImage, coverImage, schoolName, email, phone, city, address, languages, adminId) {
        try {
            if (!profileImage || !coverImage || !schoolName || !email || !phone || !city || !address || languages || !adminId) {
                throw new Error('All argument are required')
            }
            const resultSet = await AdminProfile.create({ profileImage: profileImage, coverImage: coverImage, schoolName: schoolName, email: email, phone: phone, city: city, address: address, languages: languages, adminId: adminId })
            return resultSet
        } catch (err) {
            logger.error(`Failed to create a new profile ${err}`)
            throw new Error('Failed to create a new profile')
        }

    }

    static async getProfile(id) {
        try {
            if (!id) {
                throw new Error('All argument are required!')
            }
            const resultSet = await AdminProfile.findOne({ attributes: ['coverImage', 'profileImage', 'schoolName', 'email', 'phone', 'city', 'address', 'languages'], include: { model: db.adminModel.Admin, attributes: ['username'] }, where: { id: id } })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve profile ${err}`)
            throw new Error('Failed to retrieve profile')
        }
    }
}

module.exports = { ProfileService }