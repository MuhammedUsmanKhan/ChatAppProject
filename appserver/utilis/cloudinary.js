import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});


const uploadOnCloudinary = async (imagelocalFilePath) => {

    try {

        if (!imagelocalFilePath) {

            return null

        }

        const uploadResponse = await cloudinary.uploader.upload(imagelocalFilePath, {
            resource_type: 'auto'
        })
        //file has been uploaded succesfull
        console.log('file has been uploaded succesfully', uploadResponse.url)
        return uploadResponse
    }
    catch (error) {

        fs.unlinkSync(imagelocalFilePath) // remove the locally saved temporary file
        // as the upload file operation got failed
        return null;

    }

}


export default uploadOnCloudinary
