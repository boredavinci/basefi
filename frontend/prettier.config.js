module.exports = {
  trailingComma: 'es5',
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
  importOrder: [
    '^react(.*)',
    '<THIRD_PARTY_MODULES>',
    '@/components/ui',
    '@/(.*)',
    '^[./]',
  ],
  importOrderSeparation: true,
};
