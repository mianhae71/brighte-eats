import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getAllItems = async () => {
  const response = await axios.get(`${API_URL}/review-items`);
  return response.data;
};

export const getItemById = async (id) => {
  const response = await axios.get(`${API_URL}/review-items/${id}`);
  return response.data;
};

export const createItem = async (item) => {
  const response = await axios.post(`${API_URL}/review-items`, item);
  return response.data;
};

export const updateItem = async (id, item) => {
  const response = await axios.put(`${API_URL}/review-items/${id}`, item);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await axios.delete(`${API_URL}/review-items/${id}`);
  return response.data;
};