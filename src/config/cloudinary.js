require('dotenv').config()
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params : {
        resource_type : 'auto',
        folder : 'SchoolManagement_Project',
        allowed_format : ['jpg', 'jpeg', 'png']
    }
})

const uploadToCloudinary = async(path, resource_type)=>{
    return await cloudinary.uploader.upload(path, resource_type)
}

module.exports = { storage, uploadToCloudinary }