import { SiteGraphqlPrefix } from '~/config';
import { fetchGraphql, gql } from '~/utils/graphql';

const LANDING_CONTENT_QUERY = (prefix: SiteGraphqlPrefix) => gql`
  query {
    ${prefix}_content {
      header_title
      header_description
      house_title
      house_description
      house_paragraph_1
      house_paragraph_2
      house_paragraph_3
      education_title
      education_description
      day_title
      day_description
      formular_description
      formular_address
      formular_url
      footer_kita_name
      footer_short_address
      footer_opening
      footer_management
      footer_address
      footer_email
      footer_mobile
    }
  }
`;

export interface LandingContent {
  header_title: string;
  header_description: string;
  house_title: string;
  house_description: string;
  house_paragraph_1: string;
  house_paragraph_2: string;
  house_paragraph_3: string;
  education_title: string;
  education_description: string;
  day_title: string;
  day_description: string;
  formular_description: string;
  formular_address: string;
  formular_url: string;
  footer_kita_name: string;
  footer_short_address: string;
  footer_opening: string;
  footer_management: string;
  footer_address: string;
  footer_email: string;
  footer_mobile: string;
}

export const fetchLandingContent = async (prefix: SiteGraphqlPrefix) => {
  return fetchGraphql<LandingContent>(LANDING_CONTENT_QUERY(prefix), `${prefix}_content`);
};
