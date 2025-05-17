import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      enabled: true,
      include: ['src/**'],
      all: true,
      reporter: ['html', 'lcovonly', 'text-summary'],
    },
    environment: 'node',
    globals: true,
    snapshotFormat: {
      escapeString: false,
      printBasicPrototype: false,
    },
    watch: false,
  },
});
