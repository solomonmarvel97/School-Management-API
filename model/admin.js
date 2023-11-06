require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,{ logging : false})

class Admin extends Model { }

Admin.init({
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },

    username : {
        type : DataTypes.STRING,
        allowNull : false
    },

    password : {
        type : DataTypes.BLOB,
        allowNull : false
    }
}, {
    sequelize,
    modelName : 'admin',
    createdAt : true,
    updatedAt : true
})
sequelize.sync()

module.exports = { Admin }