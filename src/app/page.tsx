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

  // Fetch data from Firebase
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
