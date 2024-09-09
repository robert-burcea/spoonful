import { Timestamp } from 'firebase/firestore';

export interface Product {
  id: string;
  alert: boolean;
  name: string;
  barcode: number;
  qty: number;
  lastDateOfInventoryCheck: Timestamp;
  unitsPerDayConsumption: number;
  minimumStockDaysForAlert: number;
}
