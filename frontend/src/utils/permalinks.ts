import { BLOG, SITE } from '~/config';

const trim = (str: string, ch?: string) => {
  let start = 0;
  let end = str.length;
  while (start < end && str[start] === ch) start += 1;
  while (end > start && str[end - 1] === ch) end -= 1;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

const trimSlash = (s: string) => trim(trim(s, '/'));
const createPath = (...params: string[]) => `/${params.filter((el) => !!el).join('/')}`;
export const cleanSlug = (text: string) => trimSlash(text);

export const ARTICLES_BASE = cleanSlug(BLOG.articles.pathname);
export const POST_BASE = cleanSlug(BLOG.post.pathname);

const basePathname = trimSlash(SITE.basePathname);

export const getPermalink = (slug = '', type = 'page') => {
  const cleanedSlug = cleanSlug(slug);

  switch (type) {
    case 'post':
      return createPath(basePathname, POST_BASE, cleanedSlug);

    case 'page':
    default:
      return createPath(basePathname, cleanedSlug);
  }
};
