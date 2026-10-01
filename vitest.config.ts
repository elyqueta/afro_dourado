import { defineConfig } from 'vitest/config';
import { join } from 'node:path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
  resolve: {
    alias: {
      '@app': join(__dirname, './src/app'),
    },
  },
});
