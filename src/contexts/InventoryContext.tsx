import { createContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../types/Product';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface InventoryContextType {
  inventory: Product[];
}

interface InventoryProviderProps {
  children: ReactNode;
}

// Create a context with a default value (optional)
const InventoryContext = createContext<InventoryContextType | undefined>(
  undefined
);

export const InventoryProvider: React.FC<InventoryProviderProps> = ({
  children,
}) => {
  const [inventory, setInventory] = useState<Product[]>([]);

  useEffect(() => {
    // Reference to the Firestore document
    const docRef = doc(db, 'inventory', 'beverages');

    // Set up a real-time listener
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as { products: Product[] };
          if (data.products) {
            const products: Product[] = data.products.map((product: any) => ({
              id: product.id,
              ...product,
            }));
            setInventory(products);
          } else {
            console.log('No products field found in the document.');
          }
        } else {
          console.log('No such document!');
        }
      },
      (error: Error) => {
        console.error('Error fetching document:', error);
      }
    );

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <InventoryContext.Provider value={{ inventory }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContext;
