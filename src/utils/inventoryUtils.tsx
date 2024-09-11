import { updateProduct } from '../firebase/firebase-functions';
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
  console.log(
    currentDate,
    lastCheckDate,
    isSameDay(currentDate, lastCheckDate)
  );
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

  if (stock <= product.minimumStockDaysForAlert) {
    return 0; // Alert now
  } else {
    return Math.ceil(
      (stock - product.minimumStockDaysForAlert) /
        product.unitsPerDayConsumption
    );
  }
};

export const checkIfThereIsAlertNow = (stock: number, product: Product) => {
  //daca stocul estimat a scazut sub zilele de alerta
  if (
    stock <=
      product.minimumStockDaysForAlert * product.unitsPerDayConsumption &&
    product.alert === false
  )
    return true;
  else if (
    stock >
    product.minimumStockDaysForAlert * product.unitsPerDayConsumption
  )
    return false;
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

export const refreshStockInfo = async (products: Product[]) => {
  // Create a new array of products with updated alert statuses
  const updatedProducts = await Promise.all(
    products.map(async (product) => {
      await updateProduct(getUpdatedProduct(product));
    })
  );

  // Optionally, handle the updatedProducts array or return it
  console.log('Updated Products:', updatedProducts);
};
