import { Product } from '../types/Product';
import { useNavigate } from 'react-router-dom';
import { calculateDaysUntilAlert } from '../utils/inventoryUtils';
import {
  deleteProduct,
  formatFirestoreTimestamp,
} from '../firebase/firebase-functions';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleEditClick = (product: Product) => {
    navigate('/update-product', { state: { product } });
  };
  const handleDeleteClick = () => {
    if (confirm(`Are you sure you want to delete ${product.name}?`))
      deleteProduct(product.id);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md m-4">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>Estimated stock: {product.qty} </p>
      <p>Days until alert: {calculateDaysUntilAlert(product)}</p>
      <p>
        Last inventory check:{' '}
        {formatFirestoreTimestamp(product.lastDateOfInventoryCheck)}
      </p>
      <p>Minimum stock days for alert: {product.minimumStockDaysForAlert}</p>
      <button
        className="bg-blue-500 text-white py-1 px-2 m-2 rounded"
        onClick={() => handleEditClick(product)}
      >
        Edit
      </button>
      <button
        className="bg-blue-500 text-white py-1 px-2 mt-2 rounded"
        onClick={() => handleDeleteClick()}
      >
        Delete
      </button>
    </div>
  );
}

export default ProductCard;
