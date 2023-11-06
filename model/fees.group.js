require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,{ logging : false})


class FeesGroup extends Model { }

FeesGroup.init({
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

    fees_type : {
        type : DataTypes.STRING,
        allowNull : false
    },

    description : {
        type : DataTypes.STRING,
        allowNull : false
    }
}, {
    sequelize,
    modelName : 'fees_group',
    createdAt : true,
    updatedAt : true
})
sequelize.sync()
module.exports = { FeesGroup }