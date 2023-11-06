const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`, { logging: false })

class Subject extends Model { }

Subject.init({

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

    teacher_name : {
        type : DataTypes.STRING,
        allowNull : false
    },

    classes : {
        type : DataTypes.STRING,
        allowNull : false
    },

    days : {
        type : DataTypes.DATEONLY,
        allowNull : false
    }
}, {
    sequelize,
    modelName : 'subject',
    createdAt : true,
    updatedAt : true
})
sequelize.sync()
module.exports = { Subject }