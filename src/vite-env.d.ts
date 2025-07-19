/// <reference types="vite/client" />

declare module '*.csv?raw' {
  const content: string;        // Vite gives you CSV as plain text
  export default content;
}
