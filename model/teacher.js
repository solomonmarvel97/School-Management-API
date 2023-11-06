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

    date_of_birth : {
        type : DataTypes.DATEONLY,
        allowNull : false
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