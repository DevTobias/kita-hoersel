export interface Post {
  id: string;
  publishDate: string;
  title: string;
  description: string;
  image: string;
  content: string;
  readingTime: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNormalizedPost = (post: any): Post => {
  const { frontmatter, Content, file } = post;
  const ID = file.split('/').pop().split('.').shift();

  return {
    id: ID,
    publishDate: frontmatter.publishDate,
    title: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image,
    content: Content,
    readingTime: frontmatter.readingTime,
  };
};

const load = async () => {
  const posts = import.meta.glob(['data/articles/**/*.md'], {
    eager: true,
  });

  const normalizedPosts = Object.keys(posts).map(async (key) => {
    const post = await posts[key];
    return getNormalizedPost(post);
  });

  const results = (await Promise.all(normalizedPosts)).sort(
    (a, b) => new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf()
  );

  return results;
};

let posts: Post[] | null;

export const fetchPosts = async (limit?: number) => {
  posts = posts || (await load());
  return limit ? posts.slice(0, limit) : posts;
};
