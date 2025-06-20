// src/components/EditItem.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItemById, updateItem } from '../utils/api';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({ itemName: '', description: '', quantity: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await fetchItemById(id);
        setItem({
          itemName: data.itemName,
          description: data.description,
          quantity: data.quantity
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load item.');
      }
    };
    loadItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { itemName, description, quantity } = item;
      await updateItem(id, { itemName, description, quantity });
      navigate('/inventory');
    } catch (err) {
      console.error(err);
      setError('Failed to update item.');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!item) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Item Name</label>
        <input
          type="text"
          name="itemName"
          value={item.itemName}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={item.description}
          onChange={handleChange}
          required
        />

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={item.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default EditItem;
