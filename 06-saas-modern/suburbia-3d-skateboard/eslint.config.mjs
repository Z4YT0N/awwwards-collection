import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['prismicio-types.d.ts', '*/prismicio.ts', 'customtypes', '.next'],
  extends: ['next/core-web-vitals', 'next/typescript'],
  react: true,
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
})
