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
    // name, expenseType, status, amount, phone, email, dueDate 

    static expenseValidation = [
        body('name', 'name must not be empty!').not().notEmpty(),
        body('expenseType', 'expenseType must not be empty!').not().notEmpty(),
        body('status', 'status must not be empty!').not().notEmpty(),
        body('amount', 'amount must not be empty!').not().notEmpty(),
        body('phone', 'phone must not be empty!').not().notEmpty(),
        body('email', 'email must not be empty!').not().notEmpty(),
        body('dueDate', 'dueDate must not be empty!').not().notEmpty(),

    ]

    static subjectValidation = [
        body('name', 'name must not be empty!').not().notEmpty(),
        body('teacher', 'teacher must not be empty!').not().notEmpty(),
        body('Classes', 'Classes must not be empty!').not().notEmpty(),
        body('days', 'days must not be empty!').not().notEmpty(),
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