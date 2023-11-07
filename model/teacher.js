const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,{ logging : false})
require('dotenv').config()

class Teacher extends Model { }

Teacher.init({
    id : {
        type : DataTypes.BIGINT,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },

    firstName : {
        type : DataTypes.STRING,
        allowNull : false
    },

    lastName : {
        type : DataTypes.STRING,
        allowNull : false
    },

    gender : {
        type : DataTypes.ENUM('Male','Female'),
        allowNull : false
    },

    Class : {
        type : DataTypes.ENUM('Jss1', 'Jss2', 'Jss3', 'Sss1', 'Sss2', 'Sss3'),
        allowNull : false
    },

    subject : {
        type : DataTypes.STRING,
        allowNull : false
    },

    address : {
        type : DataTypes.STRING,
        allowNull : false
    },

    dateOfBirth : {
        type : DataTypes.DATEONLY,
        allowNull : false,
        validate : {
            isDate : true
        }
    },

    phone : {
        type : DataTypes.BIGINT,
        allowNull : false,
        validate : {
            isNumeric : true
        }
    }
}, {
    sequelize,
    modelName : 'teacher',
    createdAt : true,
    updatedAt : true
})
sequelize.sync()

module.exports = { Teacher }