const jwt = require('jsonwebtoken')
const TokenService = require("../service/token.service");
const { respond } = require("./respond");
const { logger } = require('../config/logger');

class Verify {

    static async verifyRefreshtoken(req, res, next){
        try{
            const refreshToken = cookie?.refreshToken
            const findRefreshToken = await TokenService.findRefreshToken(refreshToken)
            if(!findRefreshToken){
                return respond(res, 400, 'Refresh token does not exist')
            }
            jwt.verify(refreshToken, process.env.SECRET, (err, decoded)=>{
                if(err){
                    return respond(res, 400, 'Invalid refresh token')
                }
                return decoded
                
            })
            next()

        }catch(err){
            logger.error(`Failed to verify refresh token ${err}`)
            return respond(res, 500, 'Internal server error')

        }
        
    }
}

module.exports = { Verify }