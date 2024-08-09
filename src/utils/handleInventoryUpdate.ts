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
      console.error('userId and item must be strings');
      return;
    }

    console.log('userId:', userId);
    console.log('item:', item);

    const inventoryRef = collection(firestore, 'users', userId, 'inventory');
    const docRef = doc(inventoryRef, item);
    console.log('Firestore Document Reference:', docRef.path);

    const docSnap = await getDoc(docRef);
    console.log('Document Snapshot:', docSnap.data());

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
    console.log("value returned handleInventoryUpdate", result);
    setInventory(result);
  } catch (error) {
    console.error('Error in handleInventoryUpdate:', error);
  }
};

export default handleInventoryUpdate;
