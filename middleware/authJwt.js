require('dotenv').config()
const jwt = require('jsonwebtoken')
const {TokenExpiredError } = require('jsonwebtoken')
const { SuccessResponse } = require('./succesHandler')
const { ErrorResponse } = require('./errorHandler')

class Authorize { 

    static async catchError(err, res){
       try{
        if(err instanceof TokenExpiredError){
            return res.status(401).json(new ErrorResponse('access token has expired unauthorized!'))
        }
        return res.status(401).json(new ErrorResponse('unauthorized!'))
        
       }catch(err){
        console.log(err)
        return res.status(500).json(new ErrorResponse('Internal server error'))
       }

    }

    static verifyToken(req, res, next){
        const accessToken = req.headers.authorization
        if(!accessToken){
            return res.status(400).json(new ErrorResponse('access token is required!'))
        }
        
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                return Authorize.catchError(err, res)
            }

            req.id = decoded.id
            next()

        })

    }
}

module.exports = { Authorize }