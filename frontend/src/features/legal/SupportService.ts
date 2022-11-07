import { SiteGraphqlPrefix } from '~/config';
import { fetchGraphql, gql } from '~/utils/graphql';

const SUPPORT_QUERY = (prefix: SiteGraphqlPrefix) => gql`
  query {
    ${prefix}_support {
      title
      content
      management
      address
    }
  }
`;

export interface Support {
  title: string;
  content: string;
  management: string;
  address: string;
}

export const fetchSupport = async (prefix: SiteGraphqlPrefix) => {
  return fetchGraphql<Support>(SUPPORT_QUERY(prefix), `${prefix}_support`);
};
