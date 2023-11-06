require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,{ logging : false})

class StudentFees extends Model { }

StudentFees.init({
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

    class : {
        type : DataTypes.STRING,
        allowNull : false
    },

    amount : {
        type : DataTypes.DECIMAL(10, 2),
        allowNull : false,
        validate : {
            isDecimal : true
        }
    },

    status : {
        type : DataTypes.ENUM('Paid', 'Unpaid'),
        allowNull : false
    },

    parentEmail : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            isEmail : true
        }
    },

    parentPhone : {
        type : DataTypes.BIGINT,
        allowNull : false,
        validate : {
            isNumeric : true
        }
    }
},{
    sequelize,
    modelName : 'studentfee',
    createdAt : true,
    updatedAt : true
})
sequelize.sync()

module.exports = { StudentFees }