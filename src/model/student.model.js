require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,{ logging : false})


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

    Class : {
        type : DataTypes.ENUM('1', '2', '3', '4', '5', '6'),
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
        type : DataTypes.ENUM('Christain', 'Islam'),
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
    sequelize: sequelize,
    modelName : 'student',
    createdAt : true,
    updatedAt : true
})

module.exports = { Student }