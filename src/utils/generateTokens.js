const jwt = require('jsonwebtoken') 
const { logger } = require('../config/logger')

class Token {

   static generateAcessToken(payload) {
    try {
        if(!payload){
            throw new Error('Invalid user data for token generation')
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d', algorithm: "HS256" })
        return accessToken
    } catch (err) {
        logger.error(`Failed to generate access token ${err}`)
        throw new Error('Failed to generate access token')
    }
}

    static generateRefreshToken(payload) {
        try {
            if(!payload){
                throw new Error('Invalid user data for token generation')
            }
            const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d', algorithm: "HS256" })
            return refreshToken
        } catch (err) {
            logger.error(`Failed to generate refresh token ${err}`)
            throw new Error('Failed to generate refresh token')
        }
    }
}

module.exports = { Token }
