import { collection, getDoc, getDocs, setDoc, doc, query, deleteDoc } from 'firebase/firestore';
import { firestore } from '@/firebase';
import updateInventory from './updateInventory';
import { useEffect } from 'react';



const handleInventoryUpdate = async (item: string, increment: boolean, setInventory: React.Dispatch<React.SetStateAction<any[]>>) => {
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
    const reslt = updateInventory();
    reslt.then((value)=>{
      console.log("value returned handleInventoryUpdate",value);
      setInventory(value);
    })
  };


export default handleInventoryUpdate
