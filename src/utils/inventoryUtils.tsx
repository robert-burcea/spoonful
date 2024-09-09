import { updateProduct } from '../firebase/firebase-functions';
import { Product } from '../types/Product';

export const getEstimatedStock = (product: Product) => {
  const currentDate = new Date();
  const lastCheckDate = new Date(product.lastDateOfInventoryCheck.toDate());
  const daysPassed = Math.floor(
    (currentDate.getTime() - lastCheckDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return product.qty - daysPassed * product.unitsPerDayConsumption;
};

export const calculateDaysUntilAlert = (product: Product) => {
  const estimatedStock = getEstimatedStock(product);

  if (estimatedStock <= product.minimumStockDaysForAlert) {
    return 0; // Alert now
  } else {
    return Math.ceil(
      (estimatedStock - product.minimumStockDaysForAlert) /
        product.unitsPerDayConsumption
    );
  }
};
export const refreshStockInfo = (products: Product[]) => {
  products.map((product) => {
    const estimatedStock = getEstimatedStock(product);
    if (estimatedStock <= product.minimumStockDaysForAlert) {
      product = { ...product, alert: true };
      updateProduct(product);
    }
  });
};
