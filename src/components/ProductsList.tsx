import { useContext, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductsContext from '../contexts/InventoryContext';
import { getEstimatedStock } from '../utils/inventoryUtils';

function ProductsList() {
  const productsContext = useContext(ProductsContext);

  useEffect(() => {
    productsContext?.inventory.map((item) => {
      let newStock = getEstimatedStock(item);
      productsContext.updateInventory(item.id, newStock);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {productsContext?.inventory.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export default ProductsList;
