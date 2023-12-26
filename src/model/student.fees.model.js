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

    gender : {
        type : DataTypes.ENUM('Male','Female'),
        allowNull : false
    },

    Class : {
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
    }
},{
    sequelize: sequelize,
    modelName : 'studentfee',
    createdAt : true,
    updatedAt : true
})
// StudentFees.create({ name : 'Ray', gender : 'Male', Class : 2, amount : 20000.00, status : 'Unpaid', email : 'judeoc@gmail.com', phone : 8132592260})
module.exports = { StudentFees }