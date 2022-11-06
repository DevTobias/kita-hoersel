import { fetchGraphql, gql } from '~/utils/graphql';

const ALL_ARTICLES_QUERY = gql`
  query {
    articles {
      slug
      title
      date_created
      description
      content
      thumbnail {
        id
        title
      }
    }
  }
`;

export interface Article {
  slug: string;
  title: string;
  date_created: string;
  description: string;
  content: string;
  thumbnail: {
    id: string;
    title: string;
  };
}

let articles: Article[] | null;

export const fetchArticles = async () => {
  articles = articles || (await fetchGraphql<Article[]>(ALL_ARTICLES_QUERY, 'articles'));
  return articles;
};
