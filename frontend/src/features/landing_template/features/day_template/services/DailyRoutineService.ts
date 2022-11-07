import { SiteGraphqlPrefix } from '~/config';
import { fetchGraphql, gql } from '~/utils/graphql';

const ROUTINE_QUERY = (prefix: SiteGraphqlPrefix) => gql`
  query {
    ${prefix}_routines {
      content
      title
      image {
        id
      }
    }
  }
`;

export interface Routine {
  title: string;
  content: string;
  image: {
    id: string;
  };
}

export const fetchDailyRoutine = async (prefix: SiteGraphqlPrefix) => {
  return fetchGraphql<Routine[]>(ROUTINE_QUERY(prefix), `${prefix}_routines`);
};
