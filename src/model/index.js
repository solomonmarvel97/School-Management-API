const { Admin } = require('./admin.model')
const { AdminProfile } = require('./admin.profile.model')
const { Expense } = require('./expense.model')
const { FeesGroup } = require('./fees.group.model')
const { Parent } = require('./parent.model')
const { Student } = require('./student.model')
const { StudentFees } = require('./student.fees.model')
const { StudentPromotion } = require('./student.promotion.model')
const { Subject } = require('./subject.model')
const { Teacher } = require('./teacher.model')
const { Token } = require('./token.model')

const syncModel = [ Admin, AdminProfile, Subject, Teacher, Student, Parent, FeesGroup, StudentFees, StudentPromotion, Expense, Token]

module.exports = { syncModel }