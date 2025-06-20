import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchItems, fetchUserItems, deleteItem } from '../utils/api';

const InventoryPage = ({ showUserItems = false }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  const loadItems = async () => {
    try {
      const data = showUserItems ? await fetchUserItems() : await fetchItems();
      setItems(data);
    } catch (err) {
      setError('Failed to load items.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteItem(id);
      loadItems();
    } catch {
      setError('Delete failed.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    loadItems();
  }, [showUserItems]);

  return (
    <div>
      <h2>{showUserItems ? 'My Inventory' : 'Public Inventory'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item-card">
            <Link to={`/items/${item.id}`} className="item-title">
              {item.itemName}
            </Link>
            <p className="item-desc">
              {item.description.length > 100
                ? item.description.slice(0, 100) + '…'
                : item.description
              }
            </p>
            <p className="item-qty">
              Quantity: {item.quantity}
            </p>
            {userId && item.userID === userId && (
              <div className="item-actions">
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryPage;
