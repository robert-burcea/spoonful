import './App.css';
import { InventoryProvider } from './contexts/InventoryContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsList from './components/ProductsList';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct';
import UpdateProductSale from './components/UpdateProductSale';
import UpdateProductInventory from './components/UpdateProduct';

function App() {
  return (
    <InventoryProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route
            path="/update-product-inventory"
            element={<UpdateProductInventory />}
          />
          <Route path="/update-product-sale" element={<UpdateProductSale />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </InventoryProvider>
  );
}

export default App;
