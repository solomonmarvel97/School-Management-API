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

    subject : {
        type : DataTypes.STRING,
        allowNull : false
    },

    teacher : {
        type : DataTypes.STRING,
        allowNull : false
    },

    Classes : {
        type : DataTypes.ENUM('1,2&4','6&JHS1','1','2','3','4','5','6'),
        allowNull : false
    },

    days : {
        type : DataTypes.STRING,
        allowNull : false,
    }

}, {
    sequelize,
    modelName : 'subject',
    createdAt : true,
    updatedAt : true
})
sequelize.sync({ force : true})

module.exports = { Subject }