const { db } = require('../model/index')

class ProfileService {
    constructor(model) {
        this.model = model
    }

    async createProfile(profileImage, coverImage, schoolName, email, phone, city, address, languages) {
        try {
            const result = await this.model.create({ profileImage: profileImage, coverImage: coverImage, schoolName: schoolName, email: email, phone: phone, city: city, address: address, languages: languages })
            return result
        } catch (err) {
            throw err
        }

    }

    async getProfile(id) {
        try {
            const result = await this.model.findOne({ attributes: ['coverImage', 'profileImage', 'schoolName', 'email', 'phone', 'city', 'address', 'languages'], include: { model: db.adminModel.Admin, attributes: ['username', 'password'] } }, { where: { id: id } })
            return result
        } catch (err) {
            throw err
        }
    }

}

module.exports = { ProfileService: new ProfileService(db.adminProfileModel.AdminProfile) }