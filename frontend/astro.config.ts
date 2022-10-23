import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import image from '@astrojs/image';
import { join } from 'path';
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

import { SITE } from './src/config';

const remarkReadingTime = () => {
  return (tree: unknown, { data }) => {
    data.astro.frontmatter.readingTime = Math.ceil(getReadingTime(toString(tree)).minutes);
  };
};

export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,

  output: 'static',

  integrations: [
    sitemap(),
    image({ serviceEntryPoint: '@astrojs/image/sharp' }),
    compress(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
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
        '~': join(__dirname, 'src'),
      },
    },
  },
});
