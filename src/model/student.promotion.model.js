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

    name : {
        type : DataTypes.STRING,
        allowNull : false
    },

    currentClass : {
        type : DataTypes.ENUM('1', '2', '3', '4', '5', '6'),
        allowNull : false

    },

    promotionFromClass : {
        type : DataTypes.ENUM('1', '2', '3', '4', '5', '6'),
        allowNull : false
        
    },

    promotionToClass : {
        type : DataTypes.ENUM('1', '2', '3', '4', '5', '6'),
        allowNull : false

    }
}, {
    sequelize: sequelize,
    modelName : 'studentpromotion',
    createdAt : true,
    updatedAt : true
})

module.exports = { StudentPromotion }