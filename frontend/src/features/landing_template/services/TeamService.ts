import { SiteGraphqlPrefix } from '~/config';
import { fetchGraphql, gql } from '~/utils/graphql';

const TEAM_QUERY = (prefix: SiteGraphqlPrefix) => gql`
  query {
    ${prefix}_team {
      name
      position
      image {
        id
      }
    }
  }
`;

export interface TeamMember {
  name: string;
  position: string;
  image: {
    id: string;
  };
}

export const fetchTeamMembers = async (prefix: SiteGraphqlPrefix) => {
  return fetchGraphql<TeamMember[]>(TEAM_QUERY(prefix), `${prefix}_team`);
};
