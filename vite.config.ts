import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [],
    globals: true,
    coverage: {
      provider: 'istanbul' // or 'c8'
    },
  },
})