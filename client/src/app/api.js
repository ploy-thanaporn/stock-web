import axios from "axios";

const api = axios.create({
  baseURL: "https://express-workshop.vercel.app",
});

export default api;
