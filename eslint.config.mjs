import next from 'eslint-config-next';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'assets-src/**', 'scripts/**', 'next-env.d.ts'] },
  ...next,
  ...nextCoreWebVitals,
  ...nextTs,
];

export default eslintConfig;
