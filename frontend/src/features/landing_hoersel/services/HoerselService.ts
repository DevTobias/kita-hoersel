import { fetchGraphql, gql } from '~/utils/graphql';

const HOERSEL_LANDING_PAGE_CONTENT_QUERY = gql`
  query {
    hoersel_landing_page {
      introduction_title
      introduction_description
      management_title
      management_description
      houses_title
      houses_description
      mechterstaedt_title
      teutleben_title
    }
  }
`;

export interface HoerselContent {
  introduction_title: string;
  introduction_description: string;
  management_title: string;
  management_description: string;
  houses_title: string;
  houses_description: string;
  mechterstaedt_title: string;
  teutleben_title: string;
}

let content: HoerselContent | null;

export const fetchHoerselContent = async () => {
  content =
    content ||
    (await fetchGraphql<HoerselContent>(
      HOERSEL_LANDING_PAGE_CONTENT_QUERY,
      'hoersel_landing_page'
    ));
  return content;
};
