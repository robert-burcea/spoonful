import { createContext, useState, ReactNode } from 'react';
import { Product } from '../types/Product';
import { MIN_DAYS_FOR_STOCK_ALERT } from '../utils/stockVariables';
import INVENTORY from '../utils/inventory.json';

export interface InventoryContextType {
  inventory: Product[];
  updateInventory: (id: number, newQuantity: number) => void;
}

interface InventoryProviderProps {
  children: ReactNode;
}

const rawProducts: {
  id: number;
  name: string;
  barcode: number;
  qty: number;
  lastDateOfInventoryCheck: string;
  unitsPerDayConsumption: number;
  minimumStockDaysForAlert: number;
}[] = INVENTORY;

const products: Product[] = rawProducts.map((item) => ({
  ...item,
  lastDateOfInventoryCheck: new Date(item.lastDateOfInventoryCheck), // Convert string to Date
  minimumStockDaysForAlert: MIN_DAYS_FOR_STOCK_ALERT,
}));

// Create a context with a default value (optional)
const InventoryContext = createContext<InventoryContextType | undefined>(
  undefined
);

export const InventoryProvider: React.FC<InventoryProviderProps> = ({
  children,
}) => {
  const [inventory, setInventory] = useState<Product[]>(products);

  const updateInventory = (id: number, newQuantity: number) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, qty: newQuantity } : item
      )
    );
  };
  return (
    <InventoryContext.Provider value={{ inventory, updateInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContext;
