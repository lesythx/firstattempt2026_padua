import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'static',
  plugins: [svelte()],
  server: { port: 3000 }
});
