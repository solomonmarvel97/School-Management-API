require('dotenv').config()
const service = require('../../service/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ErrorResponse } = require('../../middleware/errorHandler')
const { SuccessResponse } = require('../../middleware/succesHandler')

class Auth {

    static async login(req, res) {
        const { username, password } = req.body
        try {
            const findUsername = await service.adminService.findUsername(username)
            if (!findUsername) {
                return res.status(400).json(new ErrorResponse('incorrect username'))
            }
            const comparePassword = bcrypt.compareSync(password, findUsername.password.toString())
            if (!comparePassword) {
                return res.status(400).json(new ErrorResponse('incorrect passord'))
            }
            const generateJwt = jwt.sign({ id: findUsername.id }, process.env.JWT_SECRET, { expiresIn: '1h', algorithm: "HS256" })
            const createRefreshToken =  await service.refreshTokenService.createRefreshToken(findUsername)
            return res.status(200).json(new SuccessResponse('login successfull', { id: findUsername.id, username: findUsername.username, accessTokenExpiresIn: '1h', accesstoken: generateJwt, refreshtoken: createRefreshToken }))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Internal server error'))
        }
    }
}

module.exports = { Auth }