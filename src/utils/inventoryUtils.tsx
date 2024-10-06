import {
  updateAllProducts,
  updateProduct,
} from '../firebase/firebase-functions';
import { Product } from '../types/Product';

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export const isDayOfInventoryCheck = (product: Product) => {
  const currentDate = new Date();
  const lastCheckDate = new Date(product.lastDateOfInventoryCheck.toDate());
  if (isSameDay(currentDate, lastCheckDate)) return true;
};

export const getEstimatedStock = (product: Product) => {
  const currentDate = new Date();
  const lastCheckDate = new Date(product.lastDateOfInventoryCheck.toDate());
  const daysPassed = Math.floor(
    (currentDate.getTime() - lastCheckDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return product.realStock - daysPassed * product.unitsPerDayConsumption;
};

export const calculateDaysUntilAlert = (product: Product) => {
  let stock: number;
  if (isDayOfInventoryCheck(product)) {
    stock = product.realStock;
  } else stock = getEstimatedStock(product);

  return Math.ceil(stock / product.unitsPerDayConsumption);
};

function countBusinessDays(startDate: Date, endDate: Date): number {
  let currentDate = new Date(startDate);
  let businessDaysCount = 0;

  // Iterate through each date between startDate and endDate
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    // Check if the day is Monday to Friday (1 is Monday, 5 is Friday)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      businessDaysCount++;
    }
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return businessDaysCount;
}

export const checkIfThereIsAlertNow = (stock: number, product: Product) => {
  //daca stocul estimat a scazut sub zilele de alerta
  if (
    stock <=
    product.minimumStockDaysForAlert * product.unitsPerDayConsumption
  ) {
    return true;
  } else if (
    stock >
    product.minimumStockDaysForAlert * product.unitsPerDayConsumption
  ) {
    return false;
  }
};

export const getUpdatedProduct = (product: Product) => {
  let stock: number;
  //getEstimatedStock returns 0 if the inventory was checked and added today
  if (isDayOfInventoryCheck(product)) {
    stock = product.realStock;
  } else stock = getEstimatedStock(product);
  if (checkIfThereIsAlertNow(stock, product)) {
    return {
      ...product,
      alert: true,
      estimatedStock: stock,
      showEstimatedStock: isDayOfInventoryCheck(product) ? false : true,
    };
  } else
    return {
      ...product,
      estimatedStock: stock,
      showEstimatedStock: isDayOfInventoryCheck(product) ? false : true,
    };
};

export const getAllUpdatedProducts = (products: Product[]) => {
  let newProducts = products.map((product: Product) => {
    return getUpdatedProduct(product);
  });
  console.log('New Updated Products:', newProducts);
  return newProducts;
};

export const refreshStockInfo = async (products: Product[]) => {
  // Create a new array of products with updated alert statuses
  let newProducts = getAllUpdatedProducts(products);
  await updateAllProducts(newProducts);
};
