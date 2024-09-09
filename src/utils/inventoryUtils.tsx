import { Product } from '../types/Product';

export const getEstimatedStock = (product: Product) => {
  const currentDate = new Date();
  const lastCheckDate = new Date();
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
