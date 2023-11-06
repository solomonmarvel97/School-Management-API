const db = {}
db.sequelize = require('sequelize')
db.adminModel = require('./admin')
db.adminProfileModel = require('./admin.profile')
db.subjectModel = require('./subject')
db.teacherModel = require('./teacher')
db.studentModel = require('./student')
db.parentModel = require('./parent')

// 1 : 1 Asscociaion
db.adminModel.Admin.hasOne(db.adminProfileModel.AdminProfile, { onDelete : 'CASCADE'})

db.adminProfileModel.AdminProfile.belongsTo(db.adminModel.Admin, { onDelete : 'CASCADE'})

//1 : M Association
db.teacherModel.Teacher.hasMany(db.subjectModel.Subject, { onDelete : 'CASCADE'})

db.subjectModel.Subject.belongsTo(db.teacherModel.Teacher, { onDelete : 'CASCADE'})

module.exports = { db }