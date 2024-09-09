import { updateDoc, doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Product } from '../types/Product';

// Function to add a new product
export const addProductToFirebase = async (product: Product) => {
  const docRef = doc(db, 'inventory', 'beverages');

  try {
    // Fetch the current "beverages" document
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const beveragesData = docSnap.data();

      // Add the new product to the 'products' array (assumed field in the document)
      const updatedProducts = [
        ...beveragesData.products,
        {
          ...product,
          lastDateOfInventoryCheck: Timestamp.fromDate(new Date()),
        },
      ];

      // Update the document with the new product array
      await updateDoc(docRef, { products: updatedProducts });
      console.log('Product added successfully!');
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error adding product: ', error);
  }
};

// Function to update product quantity

export const updateProduct = async (product: Product) => {
  const docRef = doc(db, 'inventory', 'beverages');

  try {
    // Get the current data from Firestore
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const beveragesData = docSnap.data() as { products: Product[] };

      // Update the specific product in the array
      const updatedProducts = beveragesData.products.map(
        (dbProduct: Product) =>
          dbProduct.id === product.id
            ? { ...dbProduct, ...product } // Merge updated data with the existing product
            : dbProduct // Ensure other products remain unchanged
      );

      // Update the Firestore document with the modified product array
      await updateDoc(docRef, { products: updatedProducts });
      console.log('Product updated successfully!');
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error updating product: ', error);
  }
};

export const deleteProduct = async (productId: string) => {
  const docRef = doc(db, 'inventory', 'beverages');

  try {
    // Get the current data from Firestore
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const beveragesData = docSnap.data() as { products: Product[] };

      // Filter out the product to be deleted
      const updatedProducts = beveragesData.products.filter(
        (product: Product) => product.id !== productId
      );

      // Update the Firestore document with the modified product array
      await updateDoc(docRef, { products: updatedProducts });
      console.log('Product deleted successfully!');
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error deleting product: ', error);
  }
};

type FirestoreTimestamp = Timestamp | { seconds: number; nanoseconds: number };

export const formatFirestoreTimestamp = (
  timestamp: FirestoreTimestamp | null
): string | null => {
  if (!timestamp) return null;

  let date: Date;

  // Check if it's a Firestore Timestamp object
  if (timestamp instanceof Timestamp) {
    date = timestamp.toDate();
  }
  // Check if it's an object with seconds and nanoseconds
  else if ('seconds' in timestamp && 'nanoseconds' in timestamp) {
    date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  } else {
    return null;
  }

  // Format the date for display (e.g., 'September 5, 2024')
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
