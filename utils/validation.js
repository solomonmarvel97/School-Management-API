const { body, validationResult } = require('express-validator')
const { ErrorResponse } = require('../middleware/errorHandler')
class Validation {

    static loginValidation = [
        body('username', 'username must not be empty!').not().notEmpty(),
        body('password', 'password must not be empty!').not().notEmpty()
    ]

    static refreshtokenValidation = [
        body('refreshtoken', 'refreshtoken must not be empty!').not().notEmpty()
    ]

    static promotionValidation = [
        body('name', 'name must not be empty!').not().notEmpty(),
        body('currentClass', 'currentClass" must not be empty!').not().notEmpty(),
        body('promotionFromClass', 'promotionFromClass must not be empty!').not().notEmpty(),
        body('promotionToClass', 'promotionToClass must not be empty!').not().notEmpty()

    ]

 

    // static addStudentValidation = [
    //     body('name', 'name must not be empty!').not().notEmpty(),
    //     body('gender', 'gender must not be empty!').not().notEmpty(),
    //     body('class', 'class must not be empty!').not().notEmpty(),
    //     body('dateOfBirth', 'dateOfBirth must not be empty!').not().notEmpty(),
    //     body('bloodGroup', 'bloodGroup must not be empty!').not().notEmpty(),
    //     body('religion', 'religion must not be empty!').not().notEmpty(),
    //     body('admissionDate', 'admissionDate must not be empty!').not().notEmpty(),
    //     body('profileImage', 'admissionDate must not be empty!').not().notEmpty(),
    // ]


    static check(req, res, next){
        const validate = validationResult(req)
        if(!validate.isEmpty()){
            return res.status(400).json(new ErrorResponse('validation error', { error : validate.array()}))
        }
        next()
    }
}

module.exports = { Validation }