import { useState } from 'react';
import { Product } from '../types/Product';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleEditClick = (product: Product) => {
    navigate('/update-product', { state: { product } });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md m-4">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>Stock: {product.qty} </p>
      <p>Days until alert: </p>
      <button
        className="bg-blue-500 text-white py-1 px-2 mt-2 rounded"
        onClick={() => handleEditClick(product)}
      >
        Edit
      </button>
    </div>
  );
}

export default ProductCard;
