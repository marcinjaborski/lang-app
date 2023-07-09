import React from "react";

export const languages = ["pl", "en", "fr", "es", "it", "de"] as const;
export type Language = (typeof languages)[number];

export const shortcuts = ["b", "i", "u", "t", "l", "e", "r", "j"] as const;
export type Shortcut = (typeof shortcuts)[number];

export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type NoteUrlParams = {
  id: string;
};

export type WithComponent<T> = T & { component?: React.ElementType };
