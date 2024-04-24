declare module "*.svg";
declare module "*.webp";
declare module "*.png";
declare module "*.jpg";

declare global {
  interface ImportMeta {
    env: Record<string, string>;
  }
}

interface ImportMeta {
  env: Record<string, string>;
}
