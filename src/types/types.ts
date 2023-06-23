export const languages = ["pl", "gb", "fr", "es", "it", "de"] as const;
export type Language = (typeof languages)[number];
export type DeeplLanguage = Omit<Language, "gb">;

export const shortcuts = ["b", "i", "u", "t", "l", "e", "r", "j"] as const;
export type Shortcut = (typeof shortcuts)[number];

export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
