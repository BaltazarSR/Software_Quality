import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    tags: [
      {name: "frontend", description: "Tests written for frontend"},
      {name: "backend", description: "Tests written for backend"},
    ],
    coverage: {
      include: ['src/**/*'],
      exclude: [
        'src/assets',
        'src/*.css',
        'vite.*.ts',
        '**/*.config.*',
        '**/*.test.{ts, tsx, js, jsx}',
        '**/coverage/**',
      ]
    },
  },
});

