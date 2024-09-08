export interface Product {
  id: number;
  name: string;
  barcode: number;
  qty: number;
  lastDateOfInventoryCheck: Date;
  unitsPerDayConsumption: number;
  minimumStockDaysForAlert: number;
}
