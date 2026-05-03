/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string;
  readonly VITE_PLATFORM?: "web" | "ios" | "android";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
