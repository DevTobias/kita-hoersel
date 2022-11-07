import { SiteGraphqlPrefix } from '~/config';
import { fetchGraphql, gql } from '~/utils/graphql';

const DOCUMENTS_QUERY = (prefix: SiteGraphqlPrefix) => gql`
  query {
    ${prefix}_documents {
      name
      description
			date_created
			file {
				id
				filesize
			}
    }
  }
`;

const EVENTS_QUERY = (prefix: SiteGraphqlPrefix) => gql`
  query {
    ${prefix}_events {
      address
      date
			description
			period
    }
  }
`;

const CLOSING_QUERY = (prefix: SiteGraphqlPrefix) => gql`
  query {
    ${prefix}_closing_times {
      dates
      title
    }
  }
`;

export interface ClosingTime {
  dates: string;
  title: string;
}

export interface EventType {
  address: string;
  date: string;
  description: string;
  period: string;
}

export interface DocumentType {
  name: string;
  description: string;
  date_created: string;
  file: {
    id: string;
    filesize: string;
  };
}

export const fetchDocuments = async (prefix: SiteGraphqlPrefix) => {
  return fetchGraphql<DocumentType[]>(DOCUMENTS_QUERY(prefix), `${prefix}_documents`);
};

export const fetchEvents = async (prefix: SiteGraphqlPrefix) => {
  return fetchGraphql<EventType[]>(EVENTS_QUERY(prefix), `${prefix}_events`);
};

export const fetchClosingTimes = async (prefix: SiteGraphqlPrefix) => {
  return fetchGraphql<ClosingTime[]>(CLOSING_QUERY(prefix), `${prefix}_closing_times`);
};
