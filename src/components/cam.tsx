import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Box, Typography, Stack, TextField } from '@mui/material';
import { PhotoCamera, Upload } from '@mui/icons-material';
import Visiongoogle from './Visiongoogle';
import { res }  from './Visiongoogle'
import { convertImg } from '@/utils/ConvertImg';
import handleInventoryUpdate from '@/utils/handleInventoryUpdate';

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
  onImageUpload: (imageSrc: string) => void;
  setItem: React.Dispatch<React.SetStateAction<any[]>>
  image?: string | null;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, onClose, onImageUpload, setItem,  image }) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(image || null);
  const [generatedText, setGeneratedText] = useState<string>();
  const [filePath, setFilePath] = useState<string>('');
  const [fileType, setFileType] = useState<Boolean>(false);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        onCapture(imageSrc);

        const imgsrc = convertImg(imageSrc);
        imgsrc.then((response)=>{
          setFilePath(response)
          setFileType(true)
        })
      };
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageSrc = reader.result as string;
        setCapturedImage(imageSrc);
        onImageUpload(imageSrc);

        const imgsrc = convertImg(imageSrc);
        imgsrc.then((response)=>{
          setFilePath(response)
          setFileType(false);

        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const generateTextFromImage = () => {
    console.log("Generated text:"+res)
    if (capturedImage && res != undefined) {
      setGeneratedText(res);
    }
  };

  const addItemsToList = () => {
    // myArray = res?.substring(1, res.length-2)
    const myArray = res?.split('\\n');
    // if(myArray != null && res != undefined){
    //   myArray[0] = myArray[0].substring(1, res?.length-2)
    //   myArray[res?.length-2] = myArray[res?.length-2].substring(0 , res?.length-3);
      myArray?.map((item)=>{
        handleInventoryUpdate(item, true, setItem);

      })
    // }
  }

  return (
    <>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 600,
        bgcolor: 'white',
        borderRadius: 8,
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        overflowY: 'auto', 
        maxHeight: '80vh', 
      }}
    >
      <Typography variant="h6" component="h2" mb={2}>
        Capture or Upload Image
      </Typography>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        height="auto"
      />
      <Stack width="100%" direction="column" spacing={2} alignItems="center">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PhotoCamera />}
          onClick={capture}
        >
          Capture Image
        </Button>
        <Button
          variant="contained"
          color="primary"
          component="label"
          startIcon={<Upload />}
        >
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>

        {capturedImage && (
          <Box mt={2}>
            <img 
              src={capturedImage} 
              alt="Captured" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '300px', 
                borderRadius: '8px' 
              }} 
            />
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={generateTextFromImage}
          // disabled={!capturedImage}
        >
          Generate Text
        </Button>
        <TextField
          label="Generated Text"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={generatedText}
          InputProps={{
            readOnly: true,
          }}
          sx={{ mt: 2 }}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={addItemsToList}
          >
            Add Reciept Items
        </Button>
      </Stack>
      <Button
        variant="contained"
        color="primary"
        onClick={onClose}
        sx={{ mt: 2 }}
        >
        Close
      </Button>
    </Box>
    {filePath &&
      <Visiongoogle filePath={filePath} fileType={fileType}></Visiongoogle>
    }
    </>
  );
};

export default WebcamCapture;
