const { db } = require('../model/index')

class ProfileService {
    constructor(model){
        this.model = model
    }

    async createProfile(schoolName, email, phone, city, address, language){
        try{
            const result = await this.model.create({ schoolName : schoolName, email : email, phone : phone, city : city, address : address, language : language})
            return result
        }catch(err){
            throw err
        }

    }

    async viewProfile(userId){
        try{
            const result = await this.model.findOne({ where : { userId : userId  }})
            return result
        }catch(err){
            throw err
        }
    }
}

module.exports = { ProfileService}