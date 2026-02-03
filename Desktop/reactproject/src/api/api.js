import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token && token !== "undefined" && token !== "null") {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
