import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchItems, fetchUserItems, deleteItem, updateItem, fetchItemById } from '../utils/api';

const InventoryPage = ({ showUserItems = false }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFields, setEditFields] = useState({ itemName: '', description: '', quantity: 0 });

  const userId = localStorage.getItem('userId');

  const loadItems = async () => {
    try {
      const data = showUserItems ? await fetchUserItems() : await fetchItems();
      setItems(data);
    } catch {
      setError('Failed to load items.');
    }
  };

  useEffect(() => {
    loadItems();
  }, [showUserItems]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    await deleteItem(id);
    loadItems();
  };

  const handleEdit = async (id) => {
    if (editingId !== id) {
      const item = await fetchItemById(id);
      setEditFields({ itemName: item.itemName, description: item.description, quantity: item.quantity });
      setEditingId(id);
    } else {
      setEditingId(null);
      setEditFields({ itemName: '', description: '', quantity: 0 });
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value
    }));
  };

  const handleSave = async (id) => {
    await updateItem(id, editFields);
    setEditingId(null);
    setEditFields({ itemName: '', description: '', quantity: 0 });
    loadItems();
  };

  return (
    <div>
      <h2>{showUserItems ? 'My Inventory' : 'Public Inventory'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item-card">
            {editingId === item.id ? (
              <div>
                <input
                  type="text"
                  name="itemName"
                  value={editFields.itemName}
                  onChange={handleEditChange}
                />
                <textarea
                  name="description"
                  value={editFields.description}
                  onChange={handleEditChange}
                />
                <input
                  type="number"
                  name="quantity"
                  value={editFields.quantity}
                  onChange={handleEditChange}
                />
                <button onClick={() => handleSave(item.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <>
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
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryPage;
