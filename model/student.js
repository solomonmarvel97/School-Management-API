const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,{ logging : false})
require('dotenv').config()
class Student extends Model { }

Student.init({
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

    gender : {
        type : DataTypes.ENUM('Male','Female'),
        allowNull : false
    },

    class : {
        type : DataTypes.ENUM('Jss1', 'Jss2', 'Jss3', 'Ss1', 'Ss2', 'Ss3'),
        allowNull : false,
    },

    dateOfBirth : {
        type : DataTypes.DATEONLY,
        allowNull : false,
        validate : {
            isDate : true
        }
    },

    bloodGroup : {
        type : DataTypes.STRING,
        allowNull : false
    },

    religion : {
        type : DataTypes.STRING,
        allowNull : false
    },

    admissionDate : {
        type : DataTypes.DATEONLY,
        allowNull : false,
        validate : {
            isDate : true
        }
    },

    imageUrl : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            isUrl : true
        }
    }
}, {
    sequelize,
    modelName : 'student',
    createdAt : true,
    updatedAt : true
})
sequelize.sync()

module.exports = { Student }