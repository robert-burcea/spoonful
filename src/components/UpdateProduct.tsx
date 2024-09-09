import { useState, useContext } from 'react';
import InventoryContext from '../contexts/InventoryContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { MIN_DAYS_FOR_STOCK_ALERT } from '../utils/stockVariables';
import { Product } from '../types/Product';
import { updateProduct } from '../firebase/firebase-functions';

const UpdateProduct: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product } = location.state as { product: Product };

  const [formData, setFormData] = useState<Product>({
    barcode: product.barcode,
    alert: product.alert,
    name: product.name,
    id: product.id,
    qty: product.qty,
    lastDateOfInventoryCheck: product.lastDateOfInventoryCheck,
    unitsPerDayConsumption: product.unitsPerDayConsumption,
    minimumStockDaysForAlert: MIN_DAYS_FOR_STOCK_ALERT,
  });

  const productsList = useContext(InventoryContext);

  if (!productsList) {
    // Handle the case where context is not provided (fallback or error message)
    return <p>Error: Inventory context is not available.</p>;
  }

  //const { updateInventory } = productsList;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //updateInventory(formData.id, formData.qty);
    updateProduct(formData);
    navigate('/products');
  };

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-md m-4">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <form onSubmit={handleSubmit} className="p-7 flex flex-col items-center">
        <input
          className="border p-3"
          type="text"
          placeholder="Product name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        ></input>
        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) =>
            setFormData({ ...formData, qty: Number(e.target.value) })
          }
          className="border p-3"
        />
        <input
          className="border p-3"
          type="text"
          placeholder="Consumption (units/day)"
          onChange={(e) =>
            setFormData({
              ...formData,
              unitsPerDayConsumption: Number(e.target.value),
            })
          }
        ></input>
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
