const { ErrorResponse } = require('../../middleware/errorHandler')
const { SuccessResponse } = require('../../middleware/succesHandler')
const service = require('../../service/index')
const cloudinary = require('cloudinary').v2
class Profile {

    static async addProfile(req, res){
        try{
            const { schoolName, email, phone, city, address, languages} = req.body
            const coverImage = req.files.coverImage ? req.files.coverImage[0] : null
            const profileImage = req.files.profileImage ? req.files.profileImage[0] : null
            if(profileImage===null || coverImage===null){
                return res.status(400).json(new ErrorResponse('both field are required!'))
            }
            const uplaodcoverImage = await cloudinary.uploader.upload(coverImage.path, { resource_type : 'auto'})
            const uploadprofileImge = await cloudinary.uploader.upload(profileImage.path, {resource_type : 'auto'})

            const profile = await service.profileService.createProfile(uplaodcoverImage.secure_url, uploadprofileImge.secure_url, schoolName, email,phone, city, address, languages)
            if(!profile){
                return res.status(400).json(new ErrorResponse('profile not created'))
            }
            return res.status(200).json(new SuccessResponse('profile successfully created', profile))

        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error creating profile'))

        }
    }
    
    static async viewProfile(req, res){
        try{
            const profile = await service.profileService.getProfile(1)
            if(!profile){
                return res.status(400).json(new ErrorResponse('profile not retrieved'))
            }
            return res.status(200).json(new SuccessResponse('profile successfully retrieved', profile))
        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error retrieving  profile'))

        }
    }

    static async updateProfile(req, res){
        try{
            const { username, password } = req.body
            const profile = await service.adminService.updateAdmin(req.id, username, password)
            if(!profile){
                return res.status(400).json(new ErrorResponse('profile not updated'))
            }
            return res.status(200).json(new SuccessResponse('profile successfully updated'))
        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error updating  profile'))

        }
    }
}

module.exports = { Profile }