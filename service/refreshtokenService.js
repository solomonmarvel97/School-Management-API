const { v4: uuidv4 } = require('uuid')
const { db } = require('../model/index')
const { refreshTokenExpiration } = require('../config/auth.config')

class RefreshTokenService {
    constructor(model) {
        this.model = model
    }

    async createRefreshToken(user) {
        const token = uuidv4()
        const expirydate = new Date()
        expirydate.setSeconds(expirydate.getSeconds() + refreshTokenExpiration)
        try {
            const createToken = await this.model.create({ id: user.id, token: token, expirydate: expirydate.getTime() })
            return createToken.token
        } catch (err) {
            throw err
        }
    }
}

module.exports = { RefreshTokenService : new RefreshTokenService(db.refreshtokenModel.RefreshToken)}