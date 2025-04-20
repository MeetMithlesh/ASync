import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001", // your backend URL
  withCredentials: true, // 👈 important for cookies
});

export default instance;
