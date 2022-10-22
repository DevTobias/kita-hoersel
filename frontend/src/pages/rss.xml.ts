import rss from '@astrojs/rss';
import { SITE } from '~/config';
import { getPermalink } from '~/utils/permalinks';

import { fetchPosts } from '~/utils/posts';

export const get = async () => {
  const posts = await fetchPosts();

  return rss({
    title: `${SITE.name} Blog`,
    description: SITE.description,
    site: import.meta.env.SITE,

    items: posts.map((post) => ({
      link: getPermalink(post.id, 'post'),
      title: post.title,
      description: post.description,
      pubDate: new Date(post.publishDate),
    })),
  });
};
