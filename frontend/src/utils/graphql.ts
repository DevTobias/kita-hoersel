import { CMS_ENDPOINT } from '~/config';

export const gql = String.raw;

export const fetchGraphql = async <T>(query: string, name: string, variables?: unknown) => {
  const res = await fetch(CMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return (await res.json()).data[name] as T;
};
