import rss from '@astrojs/rss';

import { SITE } from '~/config';
import { fetchArticles } from '~/features/articles/services/ArticleService';
import { getPermalink } from '~/utils/permalinks';

export const get = async () => {
  const articles = await fetchArticles();

  return rss({
    title: `${SITE.name} Blog`,
    description: SITE.description,
    site: import.meta.env.SITE,

    items: articles.map((article) => ({
      link: getPermalink(article.slug, 'post'),
      title: article.title,
      description: article.description,
      pubDate: new Date(article.date_created),
    })),
  });
};
