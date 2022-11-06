import { SiteGraphqlPrefix } from '~/config';
import { fetchGraphql, gql } from '~/utils/graphql';

const DAY_QUERY = (prefix: SiteGraphqlPrefix) => gql`
  query {
    ${prefix}_day {
      time
      title
      description
    }
  }
`;

export interface Day {
  time: string;
  title: string;
  description?: string;
}

export const fetchDay = async (prefix: SiteGraphqlPrefix) => {
  return fetchGraphql<Day[]>(DAY_QUERY(prefix), `${prefix}_day`);
};
