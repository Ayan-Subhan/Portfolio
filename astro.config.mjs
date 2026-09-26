// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // TODO: replace with the production domain once it is registered.
  site: 'https://muhammadayan.dev',
  trailingSlash: 'ignore',
  build: {
    // Keep every stylesheet external so the CSP can stay at style-src 'self'.
    inlineStylesheets: 'never',
  },
  markdown: {
    // Prism emits class names; Shiki emits inline style="" attributes that a strict CSP blocks.
    syntaxHighlight: 'prism',
  },
  vite: {
    build: {
      // Never inline assets as data: URIs or inline scripts.
      assetsInlineLimit: 0,
    },
  },
  devToolbar: { enabled: false },
});
