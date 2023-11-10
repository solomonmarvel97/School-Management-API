const { db } = require('../model/index')
const bcrypt = require('bcrypt')
class AdminService {
    constructor(model) {
        this.model = model
    }

    async findUsername(username) {
        try {
            const result = await this.model.findOne({ where: { username: username } })
            return result
        } catch (err) {
            throw err
        }
    }

    async updateAdmin(id, username, password) {
        try {
            const result = await this.model.update({ username, password : bcrypt.hashSync(password, 8)}, { where: { id: id } })
            return result
        } catch (err) {
            throw err
        }
    }

}

module.exports = { AdminService: new AdminService(db.adminModel.Admin) }
