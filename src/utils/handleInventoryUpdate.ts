import { collection, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '@/libs/firebase/firebase';
import updateInventory from './updateInventory';

const handleInventoryUpdate = async (
  userId: string | undefined,
  item: string,
  increment: boolean,
  setInventory: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    if (typeof userId !== 'string' || typeof item !== 'string') {
      return;
    }

    const inventoryRef = collection(firestore, 'users', userId, 'inventory');
    const docRef = doc(inventoryRef, item);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      const count = typeof docData.count === 'number' ? docData.count : 0;
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

    // Fetch and update inventory
    const result = await updateInventory(userId);
    setInventory(result);
  } catch (error) {
    console.error('Error in handleInventoryUpdate:');
  }
};

export default handleInventoryUpdate;
