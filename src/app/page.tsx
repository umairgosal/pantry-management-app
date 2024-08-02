'use client'
import React, { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import WebcamCapture from '../components/cam';
import { collection, getDoc, getDocs, setDoc, doc, query, deleteDoc } from 'firebase/firestore';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: 'none',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: 8,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const Page = () => {
  const [inventory, setInventory] = useState<Array<any>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<string>('');
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('')

  const CREDENTIALS= JSON.parse(JSON.stringify({
    "type": "service_account",
    "project_id": "carbide-kite-407618",
    "private_key_id": "2404a24db0e482d179e3551233545aded65b53b7",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCTAf33cDG39rvB\ngMgBW1l1Y/HUwdVxRSTwQgj1HxzgNZD7EjQ8/yJ+w8IS7v6jp1zp8+6jZbcwqIWy\nC3sXoOCrQ7St1pqymyAffGQi1DmBEwZ7bRxYRh0K56flRboLlttNUXXbQbE5fURJ\nk2C/gYqyxKah/4P6iR/8oWVsHaiSBZAUCsDd8YuQG8l1aeNxggwXuL9Wf13gB4vl\nlwAwV/uk02I2ChjxY6faPhgr8nlB7RftYasaq1DOhbyr/Uy158vuFkqWTfrEtmKa\nqQSDwHKBx5DDodPxyUT2hiQBcTnmPtC0xmx/Ctq5NQ1yPMlBLkAGSdUjN0yaoCd7\nin34He1RAgMBAAECggEACLKwWcK3BF8aRJSXsOHcaQpS8Y9O71LjoL4NfOBcg2UT\n+RD+i4HegwDW46sloJ37TMHgs6UF6eB8uZg9jhw4EtYQk40MLedpBwfjfl6PcPRE\n2MpvyAbM+ttSRynhHESuoNRiLGkGgQPpBY/tZGNYJyPkxpbBUrJolLhhcXxPQCVy\nXlBR5G0zRjIOIr+p7BAZ4F3dg8m/8IgxCFeO5Z1IDyi+ts3cH++I5hvBQGMZbHfT\nUF8iZFkg9D1M1sOORR1zyFzZHAXTFM0aRLDkohdlt9TDOLeLDBIz303I9TQylpnm\npVP30A7Y+F4bAKoBYOpeDABL3IdFSSQXmOk/va5NgQKBgQDNjdA4Zx0NpHbUWneS\nqIRr1BjF+dqA5xhm2MQvSlaDoAM3dIVux+ZgwUBh4acB1Oxaq9NEyT+V9X8sgYpo\nTbzctvavbgpa+0swRg+oyNhR4eB6r4xdraFRtBbsJex7a0Dgi1hOjkqpwgect+FY\nN5Srndy1uBpjq7Y3Qro2aq8/wQKBgQC3FfD5MXY+XecjDS2bSCB2tw+hLq0/yRHE\nkXWjV3cpkx+dG3LkwGqldIirENN/C+/1uzN9UaAyFpSf0yUC6cyl/r3/Zn3+zCeY\nk2PFJfKUU2MTgUmw4l9cb9ZhsKUZZyl2Pb1/GFgCmv4L9KkPvv1UcYOrV6lQMa0X\n+VAM/18RkQKBgAEIKjhuRBYSckpEnf8Ne4SzDuDHjVJCVrwFcI6wN9j3T6zSl+zj\ncgOgVLtpD5aRxBH8dNYOkJQnJFlL2S8G3ODaxkhBLCoiwtDeOSvmvjdDBAZ5pSG/\nQmUPm2HaGuLPugamjG3whu1tPO6LecUgmk12QGplHzTK4uJKInctd+3BAoGATse6\nMP//iUaOtp5tCWw3y91pdEnJcrDqXFLa87YnKFSOPeQZxCSnvxot1K4g04Indu1e\ncoY1EFh3C26ndmF0FdlPmB5aCNGAGD8Tpzl08C4Ra8suElbWAch9zvtbj1q8lIxs\nhcvL0xMuTaaxOH1ONI/DwG6wBDnb6Xz13SHlnoECgYA8quxa2FOaM7tHLVQJFewN\nEuKcEirtRzIJpD+RovC46WwBX1qUgm2GkTw1mvYvzOqnasf7OzVMFKNZT5ETsba7\nBI9E6Ql7U7XLUin7WGLAxd5a7Ot0bnh/1nZlFbnTB07edignjkRgM9ESBKDaun13\nTtFObmd9TJ2jDwMYG82eHQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "vision-api-pantry-app@carbide-kite-407618.iam.gserviceaccount.com",
    "client_id": "112608848399426108251",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/vision-api-pantry-app%40carbide-kite-407618.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }))

  interface Provider {
    inventory: string;
  }

  // this code below fetches data from the firebase database.
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = docs.docs.map(doc => ({
      name: doc.id,
      ...doc.data(),
    }));
    setInventory(inventoryList);
  };

  const handleInventoryUpdate = async (item: string, increment: boolean) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (increment) {
        await setDoc(docRef, { count: count + 1 });
      } else {
        if (count > 1) {
          await setDoc(docRef, { count: count - 1 });
        } else {
          await deleteDoc(docRef);
        }
      }
    } else if (increment) {
      await setDoc(docRef, { count: 1 });
    }

    updateInventory(); // Re-fetch inventory to update UI
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCameraOpen = () => setCameraOpen(true);
  const handleCameraClose = () => setCameraOpen(false);
  const handleImageUpload = (imageSrc: string) => {
    setImage(imageSrc);
  };
  const captureImage = (imageSrc: string) => {
    setImage(imageSrc);
  };


  // this is the vision api code from here onwards...

  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');
  
  const CONFIG = {
    credentials:{
      private_key: CREDENTIALS.private_key,
      client_email: CREDENTIALS.client_email
    }
  }
  // Creates a client
  const client = new vision.ImageAnnotatorClient(CONFIG);
  // Performs label detection on the image file
  const detectLandmark = async (filepath: string) => {
    const [result] = await client.landmarkDetection(filepath);
    console.log(result);
  }
  detectLandmark('../../public/badshahi_mosque.jpeg');

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={4}
      bgcolor="#f0f2f5"
      p={3}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Add New Item
          </Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (newItem.trim()) {
                  handleInventoryUpdate(newItem, true);
                  setNewItem('');
                  handleClose();
                }
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={cameraOpen}
        onClose={handleCameraClose}
        aria-labelledby="camera-modal-title"
        aria-describedby="camera-modal-description"
      >
        <WebcamCapture
          onCapture={captureImage}
          onClose={handleCameraClose}
          onImageUpload={handleImageUpload}
          image={image}
        />
      </Modal>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ fontWeight: 'bold', borderRadius: 4 }}
      >
        Add New Item
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCameraOpen}
        sx={{ fontWeight: 'bold', borderRadius: 4 }}
      >
        Open Camera
      </Button>
      <Box 
        width="80%" 
        maxWidth="900px"
        bgcolor="white"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
        borderRadius={8}
        overflow="hidden"
      >
        <Box
          width="100%"
          height="80px"
          bgcolor="#007bff"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4" color="white" textAlign="center">
            Inventory Items
          </Typography>
        </Box>
        <Stack 
          width="100%" 
          maxHeight="400px" 
          spacing={2} 
          overflow="auto" 
          p={3}
        >
          {inventory.map(({ name, count }) => (
            <Box
              key={name}
              width="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#f9f9f9"
              borderRadius={4}
              p={2}
              boxShadow="0 2px 10px rgba(0, 0, 0, 0.05)"
            >
              <Typography variant="h6" color="#333">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h6" color="#333">
                Quantity: {count}
              </Typography>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={() => handleInventoryUpdate(name, false)}
                sx={{ fontWeight: 'bold' }}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Page;
