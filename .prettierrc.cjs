/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-01 22:46:28
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-02-01 22:48:39
 * @Description :
 */
module.exports = {
  singleQuote: true,
  semi: false,
  arrowParens: 'avoid',
  bracketSameLine: true,
  printWidth: 90,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'es5',
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^@/(.*)$',
    '^#c/(.*)$',
    '^../(.*)',
    '^./((?!scss).)*$',
    '^./(.*)',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
