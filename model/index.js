const db = {}
db.sequelize = require('sequelize')
db.adminModel = require('./admin')
db.adminProfileModel = require('./admin.profile')
db.subjectModel = require('./subject')
db.teacherModel = require('./teacher')
db.studentModel = require('./student')
db.parentModel = require('./parent')
db.feesGroupModel = require('./fees.group')
db.studentFeesModel = require('./student.fees')
db.refreshtokenModel = require('./refreshtoken')
db.studentPromotionModel = require('./student.promotion')
db.expenseModel = require('./expense')

// 1 : 1 Asscociaion
db.adminModel.Admin.hasOne(db.adminProfileModel.AdminProfile, { onDelete : 'CASCADE'})

db.adminProfileModel.AdminProfile.belongsTo(db.adminModel.Admin, { onDelete : 'CASCADE'})

//1 : 1 Association
db.adminModel.Admin.hasOne(db.refreshtokenModel.RefreshToken, { foreignKey : 'id' , onDelete : 'CASCADE'})

db.refreshtokenModel.RefreshToken.belongsTo(db.adminModel.Admin, { foreignKey : 'id' , onDelete : 'CASCADE' })

//1 : M Association
db.teacherModel.Teacher.hasMany(db.subjectModel.Subject, { onDelete : 'CASCADE'})

db.subjectModel.Subject.belongsTo(db.teacherModel.Teacher, { onDelete : 'CASCADE'})

// 1 : M Association
db.parentModel.Parent.hasMany(db.studentModel.Student, { foreignKey : 'id' , onDelete : 'CASCADE'})

db.studentModel.Student.belongsTo(db.parentModel.Parent, { foreignKey : 'id' , onDelete : "CASCADE"})

module.exports = { db }