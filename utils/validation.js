const { body, validationResult } = require('express-validator')
const { ErrorResponse } = require('../middleware/errorHandler')
class Validation {

    static loginValidation = [
        body('username', 'username must not be empty!').not().notEmpty(),
        body('password', 'password must not be empty!').not().notEmpty()
    ]

    static check(req, res){
        const validate = validationResult(req)
        if(!validate.isEmpty()){
            return res.status(400).json(new ErrorResponse(null, { error : validate.array()}))
        }
        return next()
    }
}

module.exports = { Validation }