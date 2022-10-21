import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import image from '@astrojs/image';
import { resolve } from 'path';

import { remarkReadingTime } from './src/utils/frontmatter';
import { SITE } from './src/config';

export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,

  integrations: [
    sitemap(),
    image({ serviceEntryPoint: '@astrojs/image/sharp' }),
    compress(),
    tailwind(),
    preact(),
  ],

  markdown: {
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true,
  },

  vite: {
    ssr: { noExternal: ['path-to-regexp'], external: ['svgo'] },
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
        data: resolve(__dirname, './data'),
      },
    },
  },
});
