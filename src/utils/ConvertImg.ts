'use server'
import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({ 
    cloud_name: 'dykfr5ey7', 
    api_key: '948517713616445', 
    api_secret: 'pUAmYIznJbWMhrROy3v2wqG1hek', // Click 'View Credentials' below to copy your API secret
    secure: true
});
export async function convertImg(file__: string) {

// base64 --> img format
        const resp: string = await cloudinary.uploader
        .upload(file__)
        .then((result)=>{
            return result.secure_url;
        })
        .catch((err) => {
            console.error("error form convertimg")
            return err;
        });
        return resp;
}