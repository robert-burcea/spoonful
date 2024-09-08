import { useState } from 'react';
import './App.css';
import InventoryContext, {
  InventoryContextType,
  InventoryProvider,
} from './contexts/InventoryContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Product } from './types/Product';
import ProductsList from './components/ProductsList';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <InventoryProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/products" element={<ProductsList />} />
          <Route path="/update-product" element={<UpdateProduct />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </InventoryProvider>
  );
}

export default App;
