// api.js AKA CRUD part of the inventory manager frontend
const API_URL = process.env.REACT_APP_API_URL;


// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Helper function to handle fetch requests
const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${response.statusText}`);
  }
  return await response.json();
};

// Register user
export const registerUser = async (firstName, lastName, username, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, username, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Registration failed');
  }
  return res.json();
};

// Login user
export const loginUser = async (username, password) => {
  return await fetchData(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
};

// Fetch all items for current user
export const fetchUserItems = async () => {
  return await fetchData(`${API_URL}/items/my`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
};

// Fetch all items (public)
export const fetchItems = async () => {
  return await fetchData(`${API_URL}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
};

// Fetch a specific item by id
export const fetchItemById = async (id) => {
  return await fetchData(`${API_URL}/items/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
};

// Create new item
export const createItem = async ({ itemName, description, quantity }) => {
  return await fetchData(`${API_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ itemName, description, quantity }),
  });
};

// Update an item
export const updateItem = async (id, { itemName, description, quantity }) => {
  return await fetchData(`${API_URL}/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ itemName, description, quantity }),
  });
};

// Delete an item
export const deleteItem = async (id) => {
  return await fetchData(`${API_URL}/items/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(),
    },
  });
};
