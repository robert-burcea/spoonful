import { useState, useContext } from 'react';
import InventoryContext from '../contexts/InventoryContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { MIN_DAYS_FOR_STOCK_ALERT } from '../utils/stockVariables';
import { Product } from '../types/Product';
import {
  updateAllProducts,
  updateProduct,
} from '../firebase/firebase-functions';
import { Timestamp } from 'firebase/firestore';

export type UpdateProductSaleInterface = Omit<
  Product,
  'lastDateOfInventoryCheck'
>;

const UpdateProductSale: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product } = location.state as { product: Product };

  const [formData, setFormData] = useState<Product>({
    barcode: product.barcode,
    alert: product.alert,
    name: product.name,
    id: product.id,
    qty: product.qty,
    estimatedStock: product.estimatedStock,
    realStock: product.realStock,
    unitsPerDayConsumption: product.unitsPerDayConsumption,
    minimumStockDaysForAlert: MIN_DAYS_FOR_STOCK_ALERT,
    showEstimatedStock: false,
    lastDateOfInventoryCheck: Timestamp.fromDate(new Date()),
  });

  const productsList = useContext(InventoryContext);

  if (!productsList) {
    // Handle the case where context is not provided (fallback or error message)
    return <p>Error: Inventory context is not available.</p>;
  }

  //const { updateInventory } = productsList;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedProducts = productsList.inventory.map(
      (dbProduct: Product) =>
        dbProduct.id === formData.id
          ? {
              ...dbProduct,
              estimatedStock: product.estimatedStock,
              realStock: product.realStock,
              alert: product.alert,
              showEstimatedStock: product.showEstimatedStock,
              lastDateOfInventoryCheck: Timestamp.fromDate(new Date()), // Set new inventory check date
            } // Merge updated data with the existing product
          : dbProduct // Ensure other products remain unchanged
    );
    updateAllProducts(updatedProducts);
    navigate('/products');
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-md m-4">
      <h1>Introdu bucati vandute</h1>
      <h2 className="text-xl font-bold">{product.name}</h2>
      <form onSubmit={handleSubmit} className="p-7 flex flex-col items-center">
        <input
          value={formData.name}
          className="border p-3"
          type="text"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        ></input>
        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) =>
            setFormData({
              ...formData,
              estimatedStock: formData.estimatedStock - Number(e.target.value),
              showEstimatedStock: false,
            })
          }
          className="border p-3"
        />
        <button
          type="submit"
          className="mt-3 p-3 rounded bg-blue-600 hover:bg-blue-700 border"
        >
          SAVE
        </button>
        <button
          className="mt-3 p-3 rounded bg-blue-600 hover:bg-blue-700 border"
          onClick={() => handleCancel()}
        >
          CANCEL
        </button>
      </form>
    </div>
  );
};

export default UpdateProductSale;
