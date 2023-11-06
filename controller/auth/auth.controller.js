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
            const createRefreshToken = service.refreshTokenService.createRefreshToken(findUsername)
            return res.status(200).json(new SuccessResponse('login successfull', { accessTokenExpiresIn: '1h', generateJwt, createRefreshToken, findUsername, }))
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = { Auth }