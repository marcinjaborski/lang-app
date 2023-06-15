import { TermElement } from "@src/@types";

export const isTermElement = (obj: unknown): obj is TermElement => {
  return typeof obj === "object" && obj !== null && "type" in obj && obj.type === "term";
};
