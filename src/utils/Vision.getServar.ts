import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';

const API_KEY = process.env.GOOGLE_VISION_API_KEY;

export async function getServar (filePath: string, fileType: Boolean) {
  const filePathToUse: string = typeof filePath === 'string' ? filePath : String(filePath);
  console.log("filepath in api request",filePathToUse);
  // try {
  let response;
  let textData: string;

  if(!fileType){
    response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
      {
        requests: [
          {
            image: {
              source: {
                imageUri: filePathToUse,
              },
            },
            features: [
              {
                type: 'TEXT_DETECTION',
              },
            ],
          },
        ],
      }
    );
    
    textData = response.data.responses[0].fullTextAnnotation?.text;
  } else {
    response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
      {
        requests: [
          {
            image: {
              source: {
                imageUri: filePathToUse,
              },
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 1
              },
            ],
          },
        ],
      }
    );

  textData = response.data.responses[0].labelAnnotations[0]?.description;
  // console.log("labelDetection",response.data)
  }



    const returnedData = JSON.stringify(textData);
    console.log("gosal",textData);
    if(returnedData != null){
      return returnedData;
    } else{
      console.log("caught error at getServarfile")
    }
  // }
  // catch (error) {
  //   console.error('Error fetching text:', error);
  //   return  {error: 'Error fetching text'} 
  //   }
}

