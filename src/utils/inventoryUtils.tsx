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

export const verifyIfProductStockNeedsUpdate = (product: Product) => {
  const estimatedStock = getEstimatedStock(product);
  if (
    estimatedStock <=
      product.minimumStockDaysForAlert * product.unitsPerDayConsumption &&
    product.alert === false
  ) {
    // Mark the product for alert
    const updatedProduct = { ...product, alert: true };

    // Return the updated product
    return { product: updatedProduct, change: true };
  } else if (
    product.alert === true &&
    estimatedStock >
      product.minimumStockDaysForAlert * product.unitsPerDayConsumption
  ) {
    // Mark the product for alert
    const updatedProduct = { ...product, alert: false };

    // Return the updated product
    return { product: updatedProduct, change: true };
  } else {
    // Return the product as is if no update needed
    return { product: product, change: false };
  }
};

export const refreshStockInfo = async (products: Product[]) => {
  // Create a new array of products with updated alert statuses
  const updatedProducts = await Promise.all(
    products.map(async (product) => {
      if (verifyIfProductStockNeedsUpdate(product).change === false) return;
      await updateProduct(verifyIfProductStockNeedsUpdate(product).product);
    })
  );

  // Optionally, handle the updatedProducts array or return it
  console.log('Updated Products:', updatedProducts);
};
