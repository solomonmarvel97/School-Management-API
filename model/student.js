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
        type : DataTypes.STRING,
        allowNull : false
    },

    class : {
        type : DataTypes.STRING,
        allowNull : false,
    },

    date_of_birth : {
        type : DataTypes.DATEONLY,
        allowNull : false,
        validate : {
            isDate : true
        }
    },

    blood_group : {
        type : DataTypes.STRING,
        allowNull : false
    },

    religion : {
        type : DataTypes.STRING,
        allowNull : false
    },

    admission_date : {
        type : DataTypes.DATEONLY,
        allowNull : false
    },

    image_url : {
        type : DataTypes.STRING,
        allowNull : false
    }
}, {
    sequelize,
    modelName : 'student',
    createdAt : true,
    updatedAt : true
})
sequelize.sync()

module.exports = { Student }