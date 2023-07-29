import { Descendant } from "slate";

export const useEmptyElement = (): Descendant[] => {
  return [
    {
      type: "paragraph",
      children: [{ text: "", type: "text" }],
    },
  ];
};
