import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export type pbErrorMessage =
  | "Failed to create record."
  | "Failed to authenticate."
  | "You are not allowed to perform this request.";

export type pbError = {
  status: number;
  url: string;
  message: pbErrorMessage;
};
