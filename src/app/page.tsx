'use client'
import React, { useState, useEffect, isValidElement } from 'react';
import { firestore } from '@/firebase';
import { Box, Stack, Typography, Button, Modal, TextField, Avatar, IconButton, Autocomplete } from '@mui/material';
import WebcamCapture from './components/cam';
import { collection, getDoc, getDocs, setDoc, doc, query, deleteDoc } from 'firebase/firestore';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import handleInventoryUpdate from '@/utils/handleInventoryUpdate';
import { inventry } from '@/utils/updateInventory';
import updateInventory from '@/utils/updateInventory';

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

const buttonStyle = {
  borderRadius: '20px',
  padding: '10px 20px',
  fontWeight: 'bold',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const Page = () => {
  const [inventory, setInventory] = useState<Array<any>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<string>('');
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);

    if (value) {
      const filteredInventory = inventry.filter(item =>
        item.name.toLowerCase().includes(value)
      );
      setInventory(filteredInventory);
    } else {
      const reslt = updateInventory(); // If the search query is empty, reset the inventory list
      reslt.then((value)=>{
        console.log("value returned handleSearchChange",value);
        setInventory(value);
      }) 
    }
  };
  
  const handleDeleteItem = async (item: string) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    await deleteDoc(docRef);
    const reslt = updateInventory();
        reslt.then((value)=>{
      console.log("value returned handleDeleteItem",value);
      setInventory(value);
    })
  };

  useEffect(() => {
    const reslt = updateInventory();
    reslt.then((value)=>{
      console.log("value returned ",value);
      setInventory(value);
    })
    handleSearchChange;
    handleDeleteItem;
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
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box
        width="250px"
        bgcolor="#ffffff"
        boxShadow="2px 0 10px rgba(0, 0, 0, 0.1)"
        p={2}
        display="flex"
        flexDirection="column"
        alignItems="center" 
        justifyContent="space-between"
        >
      <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar />
      <Typography variant="h6" color="#333" mb={1} mt={2} align="center">
        Welcome, User
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => console.log('Logout')}
        sx={{
          ...buttonStyle,
          backgroundColor: '#6c63ff', 
          padding: '6px 16px', 
          fontSize: '0.875rem', 
        }}
      >
      Logout
      </Button>
      </Box>
      </Box>

      {/* Main Content */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="#f0f2f5"
        p={2}
      >
        <Box
          width="100%"
          maxWidth="600px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4" color="#333">
            Pantry
          </Typography>
          <IconButton color="primary" onClick={handleCameraOpen}>
            <CameraAltIcon />
          </IconButton>
        </Box>

        <Box
          width="100%"
          maxWidth="600px"
          display="flex"
          justifyContent="center"
          mb={2}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search your pantry"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{
              fontWeight: 'bold',
              borderRadius: '12px',
              padding: '4px 8px',
              fontSize: '0.75rem',
              ml: 2,
              height: '55px', 
              minWidth: '100px', 
              boxShadow: 'none', 
            }}
          >
            Add Item
          </Button>
        </Box>

        <Box
          width="100%"
          maxWidth="600px"
          bgcolor="white"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
          borderRadius={8}
          overflow="hidden"
          p={2}
          mb={2}
        >
          <Stack spacing={2} height="400px" overflow="auto">
            {inventory.map(({ name, count }: { name: string; count: number }) => (
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
                  {name}
                </Typography>
                <Typography variant="h6" color="#333">
                  {count} pcs
                </Typography>
                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => handleInventoryUpdate(name, true, setInventory)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleInventoryUpdate(name, false, setInventory)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteItem(name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))
          }
          </Stack>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              Add Item
            </Typography>
            <Box mb={2}>
              <TextField
                id="outlined-basic"
                label="Item"
                variant="outlined"
                fullWidth
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (newItem.trim()) {
                  handleInventoryUpdate(newItem.charAt(0).toUpperCase() + newItem.slice(1), true, setInventory);
                  setNewItem('');
                  handleClose();
                }
              }}
              sx={buttonStyle}
            >
              Add Item
            </Button>
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
              setItem={setInventory}
            />
        </Modal>
      </Box>
    </Box>
  );
};

export default Page;