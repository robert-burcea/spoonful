import { useState, useContext } from 'react';
import ProductCard from './ProductCard';
import ProductsContext from '../contexts/InventoryContext';

function ProductsList() {
  const productsContext = useContext(ProductsContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {productsContext?.inventory.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export default ProductsList;
