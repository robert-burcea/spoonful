import './App.css';
import { InventoryProvider } from './contexts/InventoryContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsList from './components/ProductsList';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import UpdateProduct from './components/UpdateProduct';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <InventoryProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product" element={<UpdateProduct />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </InventoryProvider>
  );
}

export default App;
