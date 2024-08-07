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

    // const url = "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloudname + "/auto/upload";

    // const file = file__; //img.jpeg file
    // const formData = new FormData();

    // formData.append("file", file);
    // formData.append("api_key", cloudinary.config().apikey);
    // // formData.append("timestamp", signData.timestamp);
    // // formData.append("signature", signData.signature);
    // formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
    // formData.append("folder", "signed_upload_demo_form");

    // fetch(url, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => {
    //     console.log("response from new request", response.text);
    //     return response.text();
    //   })
    // //   .then((data) => {
    // //     console.log(JSON.parse(data));
    // //     var str = JSON.stringify(JSON.parse(data), null, 4);
    // //   });


// base64 --> img format
        const resp: string = await cloudinary.uploader
        .upload(file__)
        .then((result)=>{
            console.log("result",result.secure_url)
            return result.secure_url;
        })
        .catch((err) => {
            console.error("error form convertimg", err)
            return err;
        });

        return resp;
}