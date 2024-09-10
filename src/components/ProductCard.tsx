import { Product } from '../types/Product';
import { useNavigate } from 'react-router-dom';
import { calculateDaysUntilAlert } from '../utils/inventoryUtils';
import {
  deleteProduct,
  formatFirestoreTimestamp,
} from '../firebase/firebase-functions';
import Tilt from 'react-parallax-tilt';

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

  const formatDate = (date: Date | null) => {
    if (date === null) return;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Tilt
      className="p-4 border rounded-lg shadow-md m-4"
      tiltMaxAngleX={15} // Maximum tilt angle on the X axis
      tiltMaxAngleY={15} // Maximum tilt angle on the Y axis
      perspective={1000} // Perspective to control the depth of the 3D effect
      scale={1.05} // Slightly scale the card on hover
      glareEnable={true} // Optional: adds a glare effect
      glareMaxOpacity={0.2} // Optional: glare opacity
      glareColor="lightblue" // Optional: glare color
      glarePosition="bottom" // Optional: glare position
    >
      <div
        className={`p-4 border rounded-lg shadow-md m-4 ${product.alert ? 'bg-red-300' : 'bg-green-200'}`}
      >
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p>
          Stoc estimat: <p className="text-xl font-bold">{product.qty}</p>{' '}
        </p>
        <p>Zile pana la alerta: {calculateDaysUntilAlert(product)}</p>
        <p>
          Ultimul inventar:{' '}
          {formatDate(
            formatFirestoreTimestamp(product.lastDateOfInventoryCheck)
          )}
        </p>
        <p>
          Alerta cu <b>{product.minimumStockDaysForAlert}</b> zile inainte
        </p>
        <p>
          Consum pe zi: <b>{product.unitsPerDayConsumption}</b>
        </p>
        <p className="text-red-800 mt-2 font-bold">
          {product.alert ? 'ATENTIE! Stoc pe final!' : ''}
        </p>
        <button
          className="bg-blue-500 text-white py-1 px-2 m-2 rounded"
          onClick={() => handleEditClick(product)}
        >
          Edit
        </button>
        <button
          className="bg-blue-500 text-white py-1 px-2 m-2 rounded"
          onClick={() => handleDeleteClick()}
        >
          Delete
        </button>
        <button className="bg-blue-500 text-white py-1 px-2 m-2 rounded">
          Adauga vanzare
        </button>
        <button className="bg-blue-500 text-white py-1 px-2 m-2 rounded">
          Introdu stoc inventar
        </button>
      </div>
    </Tilt>
  );
}

export default ProductCard;
