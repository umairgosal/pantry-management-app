'use client'
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { firestore } from '@/firebase'
import { Box, Typography, Modal } from '@mui/material'
import { collection, getDoc, getDocs, setDoc, doc, query, deleteDoc } from 'firebase/firestore'



const page = () => {
  interface Provider {
    inventory: string;
  }

  const [inventory, setInventory] = useState<Array<any>>([])
  const [open, setOpen] = useState<boolean>(false)
  const [newItem, setNewItem] = useState<string>('')

  // this code below fetches data from the firebase database.
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot)
    const inventoryList: Array<object> = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

  const removeInventory = async (item: string) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {count} = docSnap.data()
      if(count===1){
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {count: count-1})
      }
    }
    updateInventory();
  }

    const addItem = async (item: string) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {count} = docSnap.data()
      await setDoc(docRef, {count: count+1})
      } else {
        await setDoc(docRef, {count: 1})
      }
      updateInventory();
    }
  
  useEffect(()=>{
    updateInventory() // calls the inventory data fetching on start

  }, [])

  const handleOpen = ()=> setOpen(true);
  const handleClose = ()=> setOpen(false);


  console.log(inventory); 
  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Typography variant='h1'>Inventory</Typography>
      {/* {inventory.map((item)=>{
        return(
          <>
          <Modal></Modal>
          {item.name}
          {item.count}
          <button onClick={}>remove</button>
          </>
        )
      })} */}
    </Box>
  )
}

export default page