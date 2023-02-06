import { fetchGraphql, gql } from '~/utils/graphql';

const PRIVACY_QUERY = gql`
  query {
    privacy  {
      translations(filter: { languages_code: { locale: { _eq: "de" } } }) {
          title
          description
          content
      }
    }
  }
`;

const IMPRINT_QUERY = gql`
  query {
    imprint {
      title
      description
      content
    }
  }
`;

export interface Imprint {
  title: string;
  description: string;
  content: string;
}

export interface Privacy {
  title: string;
  description: string;
  content: string;
}

export const fetchImprint = async () => {
  return fetchGraphql<Imprint>(IMPRINT_QUERY, 'imprint');
};

export const fetchPrivacy = async () => {
  return (await fetchGraphql<Privacy>(PRIVACY_QUERY, 'privacy'))["translations"][0];
};
