import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative asset paths make the build work in GitHub Pages subfolders.
export default defineConfig({ plugins: [react()], base: './' });
