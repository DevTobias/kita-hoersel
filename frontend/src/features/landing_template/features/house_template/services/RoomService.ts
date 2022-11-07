import { SiteGraphqlPrefix } from '~/config';
import { fetchGraphql, gql } from '~/utils/graphql';

const ROOM_QUERY = (prefix: SiteGraphqlPrefix) => gql`
  query {
    ${prefix}_rooms {
      label
      image {
        id
      }
    }
  }
`;

const MISC_IMAGE_QUERY = (prefix: SiteGraphqlPrefix) => gql`
  query {
    ${prefix}_images {
      label
      image {
        id
      }
    }
  }
`;

export interface Image {
  label: string;
  image: {
    id: string;
  };
}

export const fetchRooms = async (prefix: SiteGraphqlPrefix) => {
  return fetchGraphql<Image[]>(ROOM_QUERY(prefix), `${prefix}_rooms`);
};

export const fetchMiscImages = async (prefix: SiteGraphqlPrefix) => {
  return fetchGraphql<Image[]>(MISC_IMAGE_QUERY(prefix), `${prefix}_images`);
};
