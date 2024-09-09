import { useState, useContext } from 'react';
import InventoryContext from '../contexts/InventoryContext';
import { MIN_DAYS_FOR_STOCK_ALERT } from '../utils/stockVariables';
import { Product } from '../types/Product';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { addProductToFirebase } from '../firebase/firebase-functions';
import { Timestamp } from 'firebase/firestore';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Product>({
    barcode: 0,
    alert: false,
    name: '',
    id: uuidv4(),
    qty: 0,
    lastDateOfInventoryCheck: Timestamp.fromDate(new Date()),
    unitsPerDayConsumption: 0,
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
    addProductToFirebase(formData);
    navigate('/products');
  };

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-md m-4">
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
          placeholder="Consumption(units/day)"
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

export default AddProduct;
