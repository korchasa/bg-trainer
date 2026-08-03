// Node's ESM resolver demands file extensions; the app's TypeScript sources use
// bundler-style extensionless imports ("./lesson1"). This hook appends ".ts" to
// extensionless relative specifiers so a plain `node` run can import src/ directly.
// Registered by scripts/check-lesson-lexicon.mjs — not meant to be run on its own.

export function resolve(specifier, context, next) {
  if (specifier.startsWith(".") && !/\.[a-z0-9]+$/i.test(specifier)) {
    return next(`${specifier}.ts`, context);
  }
  return next(specifier, context);
}
