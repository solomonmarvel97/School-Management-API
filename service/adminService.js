const { db } = require('../model/index')

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
            const result = await this.model.update({ username, password }, { where: { id: id } })
            return result
        } catch (err) {
            throw err
        }
    }

}

module.exports = { AdminService: new AdminService(db.adminModel.Admin) }
