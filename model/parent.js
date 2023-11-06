const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,{ logging : false})
require('dotenv').config()

class Parent extends Model { }

Parent.init({
    id : {
        type : DataTypes.BIGINT,
        autoIncrement : true,
        primaryKey : true,
        allowNull :false
    },

    father_name : {
        type : DataTypes.STRING,
        allowNull : false
    },

    mother_name : {
        type : DataTypes.STRING,
        allowNull : false
    },

    email : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            isEmail : true,
        }
    },

    phone : {
        type : DataTypes.BIGINT,
        allowNull : false,
        validate : {
            isNumeric : true
        }
    },

    father_occupation : {
        type : DataTypes.STRING,
        allowNull :false
    },

    address : {
        type : DataTypes.STRING,
        allowNull : false
    },

    religion : {
        type : DataTypes.STRING,
        allowNull : false
    }
}, {
    sequelize,
    modelName : 'parent',
    createdAt : true,
    updatedAt : true
})
sequelize.sync()
module.exports = { Parent }