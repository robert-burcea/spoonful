import { createContext, useState, ReactNode } from 'react';
import { Product } from '../types/Product';
import { MIN_DAYS_FOR_STOCK_ALERT } from '../utils/stockVariables';

export interface InventoryContextType {
  inventory: Product[];
  updateInventory: (id: number, newQuantity: number) => void;
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
  const [inventory, setInventory] = useState<Product[]>([
    {
      id: 1,
      name: 'coca-cola',
      barcode: 12343,
      qty: 321,
      lastDateOfInventoryCheck: new Date(),
      unitsPerDayConsumption: 132,
      minimumStockDaysForAlert: MIN_DAYS_FOR_STOCK_ALERT,
    },
    {
      id: 2,
      name: 'fanta',
      barcode: 13343,
      qty: 331,
      lastDateOfInventoryCheck: new Date(),
      unitsPerDayConsumption: 3,
      minimumStockDaysForAlert: MIN_DAYS_FOR_STOCK_ALERT,
    },
  ]);

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
