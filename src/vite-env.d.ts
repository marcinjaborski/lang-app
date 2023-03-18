/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POCKETBASE_URL: string;
  readonly VITE_DEEPL_URL: string;
  readonly VITE_DEEPL_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
