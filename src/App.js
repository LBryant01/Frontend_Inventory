//This is the main application file for the inventory management frontend.
// It sets up the routing for the application, including public and private routes.
// It also imports all the components and pages for the application.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem'; 
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import ItemDetailPage from './pages/ItemDetailPage'; 
import Navbar from './components/Navbar'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<InventoryPage />} />
        <Route path="/inventory" element={<InventoryPage showUserItems={true} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddItem />
            </PrivateRoute>
          }
        />
        
       
      </Routes>
    </Router>
  );
}

export default App;
