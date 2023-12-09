const { logger } = require("../config/logger")
const { Token } = require("../model/token.model")

class TokenService {

    static async createRefreshToken(token) {
        try {
            if (!token) {
                throw new Error('All arguments are required')
            }
            const resultSet = await Token.create({ token: token, tokenType: 'refreshToken',  expiresIn: '2 days' })
            return resultSet
        } catch (err) {
            logger.error(`Failed to create refresh token ${err}`)
            throw new Error('Failed to create refresh token')
        }
    }

    static async findRefreshToken(token) {
        try {
            if (!token) {
                throw new Error('All arguments are required')
            }
            const resultSet = await Token.findOne({ where: { token: token } })
            return resultSet
        } catch (err) {
            logger.error(`Error finding refresh token ${err}`)
            throw new Error('Error finding refresh token ')
        }
    }

    static async deleteRefreshToken(tokenId) {
        try {
            if (!tokenId) {
                throw Error('All arguments are required')
            }
            const resultSet = await Token.destroy({ where: { id: tokenId } })
            return resultSet
        } catch (err) {
            logger.error(`Failed to delete refresh token ${err}`)
            throw new Error('Failed to delete refresh token')
        }
    }
}

module.exports = TokenService