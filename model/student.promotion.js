require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,{ logging : false})

class StudentPromotion extends Model { }

StudentPromotion.init({
    id : {
        type : DataTypes.BIGINT,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },

    currentClass : {
        type : DataTypes.ENUM('Jss1', 'Jss2', 'Jss3', 'Ss1', 'Ss2', 'Ss3'),
        allowNull : false

    },

    promotionFromClass : {
        type : DataTypes.ENUM('Jss1', 'Jss2', 'Jss3', 'Ss1', 'Ss2', 'Ss3'),
        allowNull : false
        
    },

    promotionToClass : {
        type : DataTypes.ENUM('Jss1', 'Jss2', 'Jss3', 'Ss1', 'Ss2', 'Ss3'),
        allowNull : false

    }
}, {
    sequelize,
    modelName : 'studentpromotion',
    createdAt : true,
    updatedAt : true
})
sequelize.sync()

module.exports = { StudentPromotion }