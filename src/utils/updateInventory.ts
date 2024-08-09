import { useState } from 'react';
import { collection, getDoc, getDocs, setDoc, doc, query, deleteDoc } from 'firebase/firestore';
import { firestore } from '@/firebase';

let inventry: Array<any>;


const updateInventory = async () => {
    // const [inventry, setInventry] = useState<Array<any>>([])
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = docs.docs.map(doc => ({
      name: doc.id,
      ...doc.data(),
    }));
    inventry = inventoryList;

    return inventry;

    
    // setInventry(inventoryList);
};



export default updateInventory
export { inventry }