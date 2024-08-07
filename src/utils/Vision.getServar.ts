import axios from 'axios';

const API_KEY = process.env.GOOGLE_VISION_API_KEY;

export async function getServar (filePath: string) {
  // filePath = ' ';
  console.log(filePath)
  const filePathToUse: string = typeof filePath === 'string' ? filePath : String(filePath);
  // console.log("filepath in api request",filePathToUse);
  // try {
    const response = await axios.post(
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

    const textData: string = response.data.responses[0].fullTextAnnotation?.text;
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
