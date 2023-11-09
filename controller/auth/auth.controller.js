require('dotenv').config()
const service = require('../../service/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ErrorResponse } = require('../../middleware/errorHandler')
const { SuccessResponse } = require('../../middleware/succesHandler')

class Auth {

    //Admin login 
    static async login(req, res) {
        try {
            const { username, password } = req.body
            const findUsername = await service.adminService.findUsername(username)
            if (!findUsername) {
                return res.status(400).json(new ErrorResponse('incorrect username'))
            }
            const comparePassword = bcrypt.compareSync(password, findUsername.password.toString())
            if (!comparePassword) {
                return res.status(400).json(new ErrorResponse('incorrect passord'))
            }
            const generateJwt = jwt.sign({ id: findUsername.id }, process.env.JWT_SECRET, { expiresIn: '1h', algorithm: "HS256" })
            const createRefreshToken = await service.refreshTokenService.createRefreshToken(findUsername)
            return res.status(200).json(new SuccessResponse('login successfull', { id: findUsername.id, username: findUsername.username, accessTokenExpiresIn: '1h', accesstoken: generateJwt, refreshtoken: createRefreshToken }))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Internal server error'))
        }
    }


    //Verify refresh token and generate new access token
    static async refreshVerifyToken(req, res) {
        try{
            const findToken = await service.refreshTokenService.findRefreshToken(req.body.refreshtoken)
            if(!findToken){
                return res.status(400).json( new ErrorResponse('refreshtoken does not exist'))
            }
            if(service.refreshTokenService.verifyTokenExpiration(findToken)){
                await service.refreshTokenService.deleteRefreshToken(req.body.refreshtoken)
                return res.status(400).json(new SuccessResponse('request Token has Expired please make a new signin request'))
            }
            const generateJwt = jwt.sign({ id : findToken.id }, process.env.JWT_SECRET, { expiresIn : '1h', algorithm : "HS256"})
            return res.status(200).json(new SuccessResponse({ accessTokenExpiresIn: '1h', accesstoken: generateJwt, refreshtoken: findToken.token}))
        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error validating refreshtoken'))

        }

    }

    //forgot password 
    static async forgotPassord(req, res){
        try{

        }catch(err){

        }
    }

    //update admin password 
    static async updatePassword(req, res){
        try{

        }catch(err){

        }
    }
}

module.exports = { Auth }