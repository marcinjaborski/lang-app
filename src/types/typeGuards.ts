import {
  ElementType,
  elementTypes,
  HeadingType,
  headingTypes,
  RichElement,
  Shortcut,
  shortcuts,
  TextAlignOption,
  textAlignOptions,
} from "@src/types";
import { TermElement } from "./editor";

export const isRichElement = (obj: unknown): obj is RichElement => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "type" in obj &&
    typeof obj.type === "string" &&
    elementTypes.includes(obj.type as ElementType)
  );
};

export const isTermElement = (obj: unknown): obj is TermElement => {
  return typeof obj === "object" && obj !== null && "type" in obj && obj.type === "term";
};

export const isShortcut = (key: string): key is Shortcut => {
  return shortcuts.includes(key as Shortcut);
};

export const isNotNullable = <T>(obj: T): obj is NonNullable<T> => {
  return obj !== null && obj !== undefined;
};

export const isTextAlignOption = (option: string): option is TextAlignOption => {
  return (textAlignOptions as readonly string[]).includes(option);
};

export const isHeadingType = (type: string): type is HeadingType => {
  return (headingTypes as readonly string[]).includes(type);
};
