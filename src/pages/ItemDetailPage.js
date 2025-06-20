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

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const loadItem = async () => {
      const data = await fetchItemById(id);
      setItem(data);
      setItemName(data.itemName);
      setDescription(data.description);
      setQuantity(data.quantity);
    };
    loadItem();
  }, [id]);

  const handleSaveChanges = async () => {
    await updateItem(id, { itemName, description, quantity });
    const updated = await fetchItemById(id);
    setItem(updated);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteItem(id);
    navigate('/inventory');
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  const isOwner = userId && item.userID === userId;

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
      {isOwner && (
        <div>
          {isEditing ? (
            <button onClick={handleSaveChanges}>Save Changes</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit Item</button>
          )}
          <button onClick={handleDelete}>Delete Item</button>
        </div>
      )}
    </div>
  );
};

export default ItemDetailPage;
