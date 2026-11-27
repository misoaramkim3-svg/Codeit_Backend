import axios from "axios";

export const API_URL = "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
