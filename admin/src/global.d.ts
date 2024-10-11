/// <reference types="vite/client" />

declare module "*.jpg";
declare module "*.png";
declare module "*.svg";
declare module "*.webp";

declare module "*.module.css" {
  export const classes: { [key: string]: string };
}
