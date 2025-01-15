import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';

// const API_KEY = process.env.GOOGLE_VISION_API_KEY;
const API_KEY = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCVwia4cZVMHvjKkRiaqW4/C+sAAsrie7j5BE18ni0g9Ww8jKsCZlL0Oizp+gj13F+cdIW37BmXWaK6KIWs1tH3wJyisx88njRCudWMnuHw7gnsmFf7V4cgvC44GQPPW/ak0SyNthWTaKF1M2v9ZMS73yuK0s5M1UpbkAliAaSx3hCy8oxDlsijFaIfCL+GZLxzC8xwGfQYHtOTFBThppgoi+L+Q2bKFU3/y5TTa8DqKEwyKI7w0SxgDhKYREXgBVNjb092gyaPa4na1+xBtaoTAJSm5OVOhgl6Ja33quZLzNB4KtA1sZVSnOeNeR/2eMH/yehe43M+dPcxyd2euojzAgMBAAECggEABHTbX6ci9+zlOJ8E73NtWvCbOBShdbLHbqlV8zuib7Gt9gstch9EyuIWkd70WpLFjbyjJE9L0roTwn6czqvdczlAi78MwZ14iHS5lJ1hopgGitg6qGzKIzHO6rGTEnvYIuEfj/15gzmx5RtRy+ydToYNX/UHhB5oFRdAOlygwd3PGB3OKxaaSWAV3b7U48i1wdWk8iJTT9FyjeeKN6SOS4R908wajkrKvaYCTa49Xkjzwl3pQTW7FiE1Ce0ND8l/ERq2hzTjuwCQ+LMLmOtJu3usQ8C/Ujq/qEx5QANSe0G5zztp2MeDMBaNC60Vk/aWZ7OaDWdEbpkEf5tOCSgmJQKBgQDGND/ORRnWNYNaFpXnD+87CeYM4n0NWeU1DBBpl/VWnw3yQJnnjp7vMiIWIPXdRmgaAyrUNnHrUYMejhMpF4y2JGsq/Sp+v7lRvgaP+L2RlKqCYNbBPl/CFXpX48BkSuyGNOF3ruMScfyhLuXkV4unBP4udFxuBpPpXaGA50albQKBgQDBbXnjaiJ5BuuhAXKyUI7deaAkwOyfQ0gwZZlbpX6u0L/dfouPsZCwdFinfv1bwP1mVCyMnaKqDH7xMhteGt9fB7q9CtSyhPQa78K4aHY7Q+9kmJyHZBgMBQZIxyRabwrqrQOf0FxOGXxNsMdolh9shzOmxt05BCUZPuhLVC/L3wKBgQCal/RQgctGLhUWtlkTkXUqGm1qDVo2iLBjcNZ4VgMRHhw1oLeqSa6jqPm3QtwiTCE0cNX+Eb1HKxvXQD+npGunQb6pGDAGDqqQHGRn9T5/B3L7IGdA8NKlwjTbypOsZlgX0bUusaUBJRFD8x1yven6SsWrHC1f0BecROCMd1e9/QKBgBtcFt+aBaJE3lN51vVt+6dMKuDIATBN3goqdNTHxfGISXtVCPycSzEKY/fdOI0f8TfmNB73tSiEd/g59DENcAcLGtjejVNrBvRAcbSP4hlj9JqwE4P7HoOkukzVDklUZ6DmNBsI5+WMKU778FjU00EQpreybVxBP9YgVc9B6zjVAoGBAIengY0Ebw9ToxbnTkcZn2VJEjcqJ/2wKXwKGgUMqFZ74OXNa7RvtLwzv/kuL0IkCqcEUuuaxpeekbCGJ8X9ep3p50oPxjzkQjfrmZWqVdUHotQpHO+foWdbruCR5vhYR3r8WRBhTyuVi0ZJsgv9cCwhnA4RjQKP1d+3mZywPrmf";
export async function getServar (filePath: string, fileType: Boolean) {
  const filePathToUse: string = typeof filePath === 'string' ? filePath : String(filePath);
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
  }



    const returnedData = JSON.stringify(textData);
    if(returnedData != null){
      return returnedData;
    } else{
    }

}

