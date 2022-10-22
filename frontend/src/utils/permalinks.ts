import { BLOG } from '~/config';

const trim = (str: string, ch?: string) => {
  let start = 0;
  let end = str.length;
  while (start < end && str[start] === ch) start += 1;
  while (end > start && str[end - 1] === ch) end -= 1;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

const trimSlash = (s: string) => trim(trim(s, '/'));
export const cleanSlug = (text: string) => trimSlash(text);

export const ARTICLES_BASE = cleanSlug(BLOG.articles.pathname);
export const POST_BASE = cleanSlug(BLOG.post.pathname);
