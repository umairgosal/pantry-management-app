import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/libs/firebase/firebase';

// Modify to accept userId
const updateInventory = async (userId: string) => {
  const inventoryRef = collection(firestore, 'users', userId, 'inventory');
  const snapshot = await getDocs(inventoryRef);
  const inventoryList = snapshot.docs.map(doc => ({
    name: doc.id,
    ...doc.data(),
  }));

  console.log("userid in updated inventory:"+userId)
  return inventoryList;
};

export default updateInventory;