const { v4: uuidv4 } = require('uuid')
const { db } = require('../model/index')
const authConfig = require('../config/auth.config')

class RefreshTokenService {
    constructor(model) {
        this.model = model
    }

    async createRefreshToken(user) {
        const token = uuidv4()
        const expirydate = new Date()
        expirydate.setSeconds(expirydate.getSeconds() + authConfig.refreshTokenExpiration)
        try {
            const createToken = await this.model.create({ id: user.id, token: token, expirydate: expirydate.getTime() })
            return createToken.token
        } catch (err) {
            throw err
        }
    }

     verifyTokenExpiration(refreshToken) {
            if (refreshToken && refreshToken.expirydate) {
                //checking if refreshtoken expirydate is less than the current time
                return refreshToken.expirydate.getTime() < new Date().getTime()
            }
            return true
    }


    async findRefreshToken(refreshtoken) {
        try {
            const result = await this.model.findOne({ where : { token : refreshtoken }})
            return result
        } catch (err) {
            throw err
        }
    }

    async deleteRefreshToken(refreshtoken) {
        try {
            const result = await this.model.destroy({ where: { token : refreshtoken } })
            return result
        } catch (err) {
            throw err
        }
    }
}

module.exports = { RefreshTokenService: new RefreshTokenService(db.refreshtokenModel.RefreshToken) }