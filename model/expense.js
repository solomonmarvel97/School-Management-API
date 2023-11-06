require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,{ logging : false})

class Expense extends Model { }

Expense.init({
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

    expenseType : {
        type : DataTypes.ENUM('Salary','Transport','Utilities'),
        allowNull : false
    },
    
    status : {
        type : DataTypes.ENUM('Paid','Unpaid','Due'),
        allowNull : false
    },

    amount : {
        type : DataTypes.DECIMAL,
        validate : {
            isDecimal : true
        },
        allowNull : false
    },

    phone : {
        type : DataTypes.BIGINT,
        allowNull : false,
        validate : {
            isNumeric : true
        }
    },

    email : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            isEmail : true
        }
    },

    dueDate : {
        type : DataTypes.DATEONLY,
        allowNull : false,
        validate : {
            isDate : true
        }
    }
}, {
    sequelize,
    modelName : 'expense',
    createdAt : true,
    updatedAt : true
})
sequelize.sync()

module.exports = { Expense }