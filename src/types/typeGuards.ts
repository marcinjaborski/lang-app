import { Shortcut, shortcuts } from "@src/types";
import { TermElement } from "./editor";

export const isTermElement = (obj: unknown): obj is TermElement => {
  return typeof obj === "object" && obj !== null && "type" in obj && obj.type === "term";
};

export const isShortcut = (key: string): key is Shortcut => {
  return shortcuts.includes(key as Shortcut);
};
