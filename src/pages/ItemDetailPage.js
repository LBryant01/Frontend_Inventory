// src/pages/ItemDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItemById, updateItem, deleteItem } from '../utils/api';

const ItemDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await fetchItemById(id);
        setItem(data);
        setItemName(data.itemName);
        setDescription(data.description);
        setQuantity(data.quantity);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };
    loadItem();
  }, [id]);

  const handleSaveChanges = async () => {
    try {
      await updateItem(id, { itemName, description, quantity });
      const updated = await fetchItemById(id);
      setItem(updated);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(id);
      navigate('/inventory');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h2>{isEditing ? 'Edit Item' : 'Item Details'}</h2>

      <div>
        <label>Item Name: </label>
        {isEditing ? (
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        ) : (
          <span>{item.itemName}</span>
        )}
      </div>

      <div>
        <label>Description: </label>
        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <span>{item.description}</span>
        )}
      </div>

      <div>
        <label>Quantity: </label>
        {isEditing ? (
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        ) : (
          <span>{item.quantity}</span>
        )}
      </div>

      <div>
        {isEditing ? (
          <button onClick={handleSaveChanges}>Save Changes</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit Item</button>
        )}
        <button onClick={handleDelete}>Delete Item</button>
      </div>
    </div>
  );
};

export default ItemDetailPage;
