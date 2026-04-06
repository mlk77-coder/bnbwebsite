import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)))
const nm = (...segments) => path.join(projectRoot, 'node_modules', ...segments)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Must match turbopack.root when both are set (Next normalizes tracing + Turbopack to one root).
  outputFileTracingRoot: projectRoot,
  turbopack: {
    // Extra lockfile under the user profile makes Next infer the wrong workspace root; PostCSS
    // then resolves `@import "tailwindcss"` from `...\Documents\GitHub` instead of this app.
    root: projectRoot,
    resolveAlias: {
      tailwindcss: nm('tailwindcss'),
      'tw-animate-css': nm('tw-animate-css'),
      shadcn: nm('shadcn'),
    },
  },
}

export default nextConfig
