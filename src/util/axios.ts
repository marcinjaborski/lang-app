import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_POCKETBASE_URL,
});

export default axiosClient;
