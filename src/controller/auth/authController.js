require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { respond } = require('../../utils/respond')
const { logger } = require('../../config/logger')
const { AdminService } = require('../../service/admin.service')
const TokenService = require('../../service/token.service')
const { Token } = require('../../utils/generateTokens')

class AuthController {
    static async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await AdminService.findUsername(username)
            const comparePassword = bcrypt.compareSync(password, user.password.toString())
            if (!user || !comparePassword) {
                return respond(res, 400, 'Incorrect username or password')
            }
            const accessToken = Token.generateAcessToken({ id: user.id })
            const refreshToken = Token.generateRefreshToken({ id: user.id })
            await TokenService.createRefreshToken(refreshToken)
            res.clearCookie('refreshToken', refreshToken, { httOnly: true, secure: true })
            //Creates secure cookie with refresh token
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 2 * 24 * 60 * 60 * 1000 }) // 2 days
            return respond(res, 200, ' Login successfull', { access_token: accessToken, token_type: 'bearer', expires_in: 86400000, user })
        } catch (err) {
            logger.error(`Failed log in attempt ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Verify refresh token and generate new access token
    static async refreshVerifyToken(req, res) {
        try {
            const refreshToken = req.cookies?.refreshToken
            const decode = jwt.verify(refreshToken, process.env.JWT_SECRET)
            const userId = decode.id
            const findUser = await AdminService.findById(userId)
            if (!findUser) {
                return respond(res, 403, 'Refresh token does not exist ')
            }
            //refresh token rotation is implemented
            await TokenService.deleteRefreshToken(findUser.id)
            const newAccessToken = Token.generateAcessToken({ id: findUser.id })
            const newRefreshToken = Token.generateRefreshToken({ id: findUser.id })
            res.clearCookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true })
            res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, maxAge: 2 * 24 * 60 * 60 * 1000 }) // 2 days
            return respond(res, 200, 'Access token generated successfully', { access_token: newAccessToken, token_type: 'bearer', expires_in: 86400000 })
        } catch (err) {
            logger.error(`Failed to generate access token ${err}`)
            return respond(res, 500, 'Failed to generate access token')

        }
    }
}

module.exports = { AuthController }