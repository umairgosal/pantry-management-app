import React, { useRef, useState } from 'react';
// import { toast } from 'react-toastify';
import Webcam from 'react-webcam';
import { Button, Box, Typography, Stack, TextField } from '@mui/material';
import { PhotoCamera, Upload } from '@mui/icons-material';
import Visiongoogle from './Visiongoogle';
import { convertImg } from '@/utils/ConvertImg';
import handleInventoryUpdate from '@/utils/handleInventoryUpdate';

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
  onImageUpload: (imageSrc: string) => void;
  setItem: React.Dispatch<React.SetStateAction<any[]>>
  image?: string | null;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, onClose, onImageUpload, setItem, image }) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(image || null);
  const [generatedText, setGeneratedText] = useState<string>('');
  const [filePath, setFilePath] = useState<string>('');
  const [fileType, setFileType] = useState<Boolean>(false);
  const [shouldGenerateText, setShouldGenerateText] = useState<boolean>(false); // New state to track button click

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // Reset states for new image
        setCapturedImage(imageSrc);
        setGeneratedText('');
        setFilePath('');
        setFileType(true);
        setShouldGenerateText(false); // Reset flag when a new image is captured

        onCapture(imageSrc);

        const imgsrc = convertImg(imageSrc);
        imgsrc.then((response) => {
          setFilePath(response);
        });
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageSrc = reader.result as string;

        // Reset states for new image
        setCapturedImage(imageSrc);
        setGeneratedText('');
        setFilePath('');
        setFileType(false);
        setShouldGenerateText(false); // Reset flag when a new image is uploaded

        onImageUpload(imageSrc);

        const imgsrc = convertImg(imageSrc);
        imgsrc.then((response) => {
          setFilePath(response);
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleTextGenerated = (text: string) => {
    setGeneratedText(text);
  };

  const generateTextFromImage = () => {
    if (filePath) {
      setShouldGenerateText(true); // Set flag to true when the button is clicked
    }
  };

  const addItemsToList = () => {
    const myArray = generatedText.split('\\n');
    // const addedItems = [];
    myArray.forEach((item) => {
      // handleInventoryUpdate(item, true, setItem);
    const cleanedItem = item.replace(/^["']|["']$/g, ''); // Removes leading and trailing quotes
      
    handleInventoryUpdate(cleanedItem.charAt(0).toUpperCase() + cleanedItem.slice(1), true, setItem);
    
    });
    alert(`Items added to the pantry`);
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
            disabled={!filePath}
          >
            Generate Text
          </Button>
          <TextField
            placeholder="Generated Text"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={generatedText.split('\\n')}
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
            Add Receipt Items
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
      {shouldGenerateText && filePath &&
        <Visiongoogle filePath={filePath} fileType={fileType} onTextGenerated={handleTextGenerated} />
      }
    </>
  );
};

export default WebcamCapture;
