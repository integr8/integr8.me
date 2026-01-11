import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://integr8.me',
  output: 'static',
  
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],
  
  i18n: {
    defaultLocale: 'ptbr',
    locales: ['ptbr', 'en'],
    routing: { prefixDefaultLocale: true },
  },
  
  markdown: {
    shikiConfig: { theme: 'github-dark', wrap: true },
  },
});
