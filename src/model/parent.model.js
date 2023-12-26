require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const { Student } = require('./student.model')
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,{ logging : false})


class Parent extends Model { }

Parent.init({
    id : {
        type : DataTypes.BIGINT,
        autoIncrement : true,
        primaryKey : true,
        allowNull :false
    },

    fatherName : {
        type : DataTypes.STRING,
        allowNull : false
    },

    motherName : {
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

    fathersOccupation : {
        type : DataTypes.STRING,
        allowNull :false
    },

    address : {
        type : DataTypes.STRING,
        allowNull : false
    },

    religion : {
        type : DataTypes.ENUM('Christain','Islam'),
        allowNull : false
    }
}, {
    sequelize: sequelize,
    modelName : 'parent',
    createdAt : true,
    updatedAt : true
})

Parent.hasMany(Student, { foreignKey : 'id' , onDelete : 'CASCADE'})

Student.belongsTo(Parent, { foreignKey : 'id' , onDelete : "CASCADE"})

module.exports = { Parent }