import { SiteGraphqlPrefix } from '~/config';
import { fetchGraphql, gql } from '~/utils/graphql';

const EDUCATION_QUERY = (prefix: SiteGraphqlPrefix) => gql`
  query {
    ${prefix}_education {
      title
      icon
      description
    }
  }
`;

export interface EducationParagraph {
  title: string;
  icon: string;
  description: string;
}

export const fetchEducationParagraphs = async (prefix: SiteGraphqlPrefix) => {
  return fetchGraphql<EducationParagraph[]>(EDUCATION_QUERY(prefix), `${prefix}_education`);
};
