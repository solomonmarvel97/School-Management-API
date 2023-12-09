const { Sequelize, Model, DataTypes } = require('sequelize')
const { Admin } = require('./admin.model')
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`, { logging: false })
require('dotenv').config()

class Token extends Model { }

Token.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    tokenType: {
        type: DataTypes.STRING,
        allowNull: false
    },

    expiresIn: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'token',
    createdAt: true,
    updatedAt: true
})

Admin.hasOne(Token, { foreignKey: 'id', onDelete: 'CASCADE' })
Token.belongsTo(Admin, { foreignKey: 'id', onDelete: 'CSACDAE' })
module.exports = { Token }