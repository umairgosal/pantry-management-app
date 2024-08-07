import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Box, Typography, Stack, TextField } from '@mui/material';
import { PhotoCamera, Upload } from '@mui/icons-material';
import Visiongoogle from './Visiongoogle';
import { res }  from './Visiongoogle'
import { convertImg } from '@/utils/ConvertImg';

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
  onImageUpload: (imageSrc: string) => void;
  image?: string | null;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, onClose, onImageUpload, image }) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(image || null);
  const [generatedText, setGeneratedText] = useState<string>('');
  const [filePath, setFilePath] = useState<string>('');

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        onCapture(imageSrc);
      }
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
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const generateTextFromImage = () => {
    // Implement AI logic here to generate text from image
    if (capturedImage && res != undefined) {
      setGeneratedText(res);
    }
  };

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
          disabled={!capturedImage}
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
    {capturedImage && 
      <Visiongoogle filePath={filePath}></Visiongoogle>
    }
    </>
  );
};

export default WebcamCapture;
