const { db } = require('../model/index')

class AdminService {
    constructor(model) {
        this.model = model
    }

    async findUsername(username) {
        try {
            const result = await this.model.findOne({ where: { username: username }, attributes : ['id','username'] })
            return result
        } catch (err) {
            throw err
        }
    }
}

module.exports = { AdminService : new AdminService(db.adminModel.Admin)}
