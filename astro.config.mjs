// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  server: { open: true },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), icon()]
});