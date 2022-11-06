import { SiteGraphqlPrefix } from '~/config';
import { fetchGraphql, gql } from '~/utils/graphql';

const QUICK_FACTS_QUERY = (prefix: SiteGraphqlPrefix) => gql`
  query {
    ${prefix}_quick_facts {
      label
      value
    }
  }
`;

export interface QuickFact {
  label: string;
  value: string;
}

export const fetchQuickFacts = async (prefix: SiteGraphqlPrefix) => {
  return fetchGraphql<QuickFact[]>(QUICK_FACTS_QUERY(prefix), `${prefix}_quick_facts`);
};
