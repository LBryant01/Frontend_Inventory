// src/components/InventoryItem.js
import { Link } from 'react-router-dom';
import { deleteItem } from '../utils/api';

const InventoryItem = ({ item }) => {
  const handleDelete = async () => {
    await deleteItem(item.id);
    window.location.reload();
  };

  return (
    <div className="inventory-item">
      <h3>{item.itemName}</h3>
      <p>
        {item.description.length > 100
          ? item.description.substring(0, 100) + '…'
          : item.description
        }
      </p>
      <p><strong>Quantity:</strong> {item.quantity}</p>
      <Link to={`/items/${item.id}`}>View Details</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default InventoryItem;
