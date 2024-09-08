import { useState, useContext } from 'react';
import { Product } from '../types/Product';
import InventoryContext from '../contexts/InventoryContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const UpdateProduct: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product } = location.state as { product: Product };

  const [formData, setFormData] = useState<Product>({
    barcode: product.barcode,
    name: product.name,
    id: product.id,
    qty: product.qty,
  });

  const productsList = useContext(InventoryContext);

  if (!productsList) {
    // Handle the case where context is not provided (fallback or error message)
    return <p>Error: Inventory context is not available.</p>;
  }

  const { inventory, updateInventory } = productsList;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInventory(formData.id, formData.qty);
    navigate('/products');
  };

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-md m-4">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <form onSubmit={handleSubmit} className="p-7 flex flex-col items-center">
        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) =>
            setFormData({ ...formData, qty: Number(e.target.value) })
          }
          className="border p-3"
        />
        <button
          type="submit"
          className="mt-3 p-3 rounded bg-blue-600 hover:bg-blue-700 border"
        >
          SAVE
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
