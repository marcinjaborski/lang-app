import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export type pbError = {
  status: number;
  url: string;
  message: string;
};

export default pb;
