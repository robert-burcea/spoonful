import { useState } from 'react';
import { Product } from '../types/Product';
import { useNavigate } from 'react-router-dom';
import {
  calculateDaysUntilAlert,
  getEstimatedStock,
} from '../utils/inventoryUtils';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleEditClick = (product: Product) => {
    navigate('/update-product', { state: { product } });
  };

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date as 'MM/DD/YYYY' or based on locale
  };

  return (
    <div className="p-4 border rounded-lg shadow-md m-4">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>Estimated stock: {product.qty} </p>
      <p>Days until alert: {calculateDaysUntilAlert(product)}</p>
      <p>
        Last inventory check: {formatDate(product.lastDateOfInventoryCheck)}
      </p>
      <p>Minimum stock days for alert: {product.minimumStockDaysForAlert}</p>
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
