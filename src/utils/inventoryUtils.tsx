import { Product } from '../types/Product';

export const calculateDaysUntilAlert = (product: Product) => {
  const currentDate = new Date();
  const lastCheckDate = new Date(product.lastDateOfInventoryCheck);
  const daysPassed = Math.floor(
    (currentDate.getTime() - lastCheckDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const estimatedStock =
    product.qty - daysPassed * product.unitsPerDayConsumption;

  if (estimatedStock <= product.minimumStockForAlert) {
    return 0; // Alert now
  } else {
    return Math.ceil(
      (estimatedStock - product.minimumStockForAlert) /
        product.unitsPerDayConsumption
    );
  }
};
