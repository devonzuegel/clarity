/**
 * Customize the NodeJS environment using polyfills or mocks
 */

export const polyfills = ({ console }: { console: boolean }) => ({
  console,
  global:     false,
  process:    false,
  Buffer:     false,
  __filename: false,
  __dirname:  false,
})
