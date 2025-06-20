// src/pages/AddItem.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../utils/api';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createItem({ itemName, description, quantity });
      navigate('/inventory');
    } catch (err) {
      setError('Failed to create item.');
    }
  };

  return (
    <div>
      <h2>Add Item</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddItem;