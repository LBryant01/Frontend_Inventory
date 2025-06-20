// src/pages/ItemDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemById } from '../utils/api';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await fetchItemById(id);
        setItem(data);
      } catch (err) {
        setError('Failed to load item.');
      }
    };
    loadItem();
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h2>{item.itemName}</h2>
      <p className="item-detail-desc"><strong>Description:</strong> {item.description}</p>
      <p><strong>Quantity:</strong> {item.quantity}</p>
    </div>
  );
};

export default ItemDetail;

