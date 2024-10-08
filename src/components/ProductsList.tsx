import { useContext, useEffect } from 'react';
import ProductCard from './ProductCard';
import InventoryContext from '../contexts/InventoryContext';
import { refreshStockInfo } from '../utils/inventoryUtils';

function ProductsList() {
  const inventoryContext = useContext(InventoryContext);

  useEffect(() => {
    if (inventoryContext !== undefined) {
      console.log('Before refreshAllStock', inventoryContext.inventory);
      refreshStockInfo(inventoryContext.inventory);
      console.log('After refreshAllStock', inventoryContext.inventory);
    }
  }, [inventoryContext]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {inventoryContext?.inventory.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export default ProductsList;
