require('dotenv').config()
const jwt = require('jsonwebtoken')
const { TokenExpiredError } = require('jsonwebtoken')
const { respond } = require('./respond')
const { logger } = require('../config/logger')

class Authorize {

    static async catchAccesTokenError(err, res) {
        try {
            if (err instanceof TokenExpiredError) {
                return respond(res, 401, 'Access token has expired unauthorized!')
            }
            return respond(res, 401, 'Unauthorized!')
        } catch (err) {
            logger.error(`Error Validating access token Error: ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    static async catchRefreshTokenError(err, res) {
        try {
            if (err instanceof TokenExpiredError) {
                return respond(res, 401, 'Refresh token has expired make a new sigin request')
            }
            return respond(res, 404, 'Refresh token does not exist')
        } catch (err) {
            logger.error(`Error validating refresh token Error: ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }



    static verifyAccessToken(req, res, next) {
        const accessToken = req.headers.authorization
        if (!accessToken) {
            return respond(res, 401, 'Access token is required')
        }

        jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return Authorize.catchAccesTokenError(err, res)
            }
            req.id = decoded.id
            next()

        })
    }

    static verifyRefreshToken(req, res, next) {
        const refreshToken = req.cookies?.refreshToken
        if (!refreshToken) {
            return respond(res, 401, 'Refresh token is required')
        }

        jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return Authorize.catchRefreshTokenError(err, res)
            }

            req.reftoken = decoded.id
        })
        next()
    }
}

module.exports = { Authorize }