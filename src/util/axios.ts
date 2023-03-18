import axios from "axios";

export const axiosDeepl = axios.create({
  baseURL: import.meta.env.VITE_DEEPL_URL,
  params: {
    auth_key: import.meta.env.VITE_DEEPL_KEY,
  },
});
