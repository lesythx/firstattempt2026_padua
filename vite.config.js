<<<<<<< HEAD
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'static',
  plugins: [svelte()],
  server: { port: 3000 }
});
=======
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()]
})
>>>>>>> d4a65292230327cc23a1ff629ed67737bde110dc
