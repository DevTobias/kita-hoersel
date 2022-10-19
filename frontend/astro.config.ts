import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

import { SITE, PAGES } from './src/config';

export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,

  integrations: [sitemap({ customPages: PAGES }), compress(), tailwind(), preact()],

  output: 'server',
  adapter: node({
    mode: 'middleware',
  }),

  vite: {
    ssr: {
      noExternal: ['path-to-regexp'],
    },
  },
});
