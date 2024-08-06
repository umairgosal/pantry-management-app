import axios from 'axios';

const API_KEY = process.env.GOOGLE_VISION_API_KEY;



export async function getServar () {
  const filePath = 'https://legaltemplates.net/wp-content/uploads/receipt-template.png';

  const filePathToUse: string = typeof filePath === 'string' ? filePath : String(filePath);

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
    if(returnedData != null){
      // console.log("gosal",returnedData);
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
