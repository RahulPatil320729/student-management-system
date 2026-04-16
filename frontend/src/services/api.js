import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const BASE_URL = 'http://localhost:5000'; // Define base URL for uploads

const api = axios.create({
  baseURL: API_URL,
});

export const getStudents = (search = '') => api.get(`/students${search ? `?search=${search}` : ''}`);
export const getStudent = (id) => api.get(`/students/${id}`);
export const createStudent = (formData) => api.post('/students', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const updateStudent = (id, formData) => api.put(`/students/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const deleteStudent = (id) => api.delete(`/students/${id}`);

export default api;