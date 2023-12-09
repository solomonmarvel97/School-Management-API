const { logger } = require('../config/logger')
const { Admin } = require('../model/admin.model')
const bcrypt = require('bcrypt')
require('dotenv').config()

class AdminService {
    static async findUsername(username) {
        try {
            if (!username) {
                throw new Error('All argument are required!')
            }
            const resultSet = await Admin.findOne({ where: { username: username } })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve admin ${err}`)
            throw new Error('Failed to retrieve admin')
        }
    }

    static async findById(id) {
        try {
            if (!id) {
                throw new Error('All argument are required!')
            }
            const resultSet = await Admin.findByPk(id)
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve admin ${err}`)
            throw new Error('Failed to retrieve admin')
        }
    }

    static async updateAdmin(id, username, password) {
        try {
            if (!id || !username || !password) {
                throw new Error('All argument are required!')
            }
            const resultSet = await Admin.update({ username, password: bcrypt.hashSync(password, 8) }, { where: { id: id } })
            return resultSet
        } catch (err) {
            logger.error(`Failed to update admin ${err}`)
            throw new Error('Failed to update admin')
        }
    }
}

module.exports = { AdminService }
