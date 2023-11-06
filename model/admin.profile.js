require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`, { logging: false })


class AdminProfile extends Model {}

AdminProfile.init({
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },

    school_name : {
        type : DataTypes.STRING,
        allowNull : false
    },

    email : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            isEmail : true
        }
    },

    phone : {
        type : DataTypes.BIGINT,
        allowNull : false,
        validate : {
            isNumeric : true
        }
    },

    city : {
        type : DataTypes.STRING,
        allowNull : false
    },

    address : {
        type : DataTypes.STRING,
        allowNull : false
    }
}, {
    sequelize,
    modelName : 'admin_profile',
    createdAt : true,
    updatedAt : true
})

sequelize.sync()
module.exports = { AdminProfile }