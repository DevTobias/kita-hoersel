export const SITE = {
  name: 'Kitas der Gemeinde Hörsel',

  origin: 'https://tobias-kaerst.de',
  basePathname: '/',

  title: 'Kindertagesstädten Hörsel',
  description:
    'Die Kindergärten Dreikäsehoch Mechterstädt und Kleine Strolche Teutleben sind die zwei kommunalen Kindergarteneinrichtung der Gemeinde Hörsel.',
};

export const CMS_ENDPOINT = 'https://admin.tobias-kaerst.de/graphql';
export const ASSET_ENDPOINT = 'https://admin.tobias-kaerst.de/assets';

export const ROUTES = {
  home: '/',
  teutlebenLanding: '/teutleben',
  mechterstaedtLanding: '/mechterstaedt',
  privacy: '/privacy',
  imprint: '/imprint',
  contact: '/contact',
  parentSection: '/parents',
  supportAssociation: '/support',
  ourHouse: '/house',
  dailyRoutine: '/daily-routine',
};

export const ARTICLES = {
  postsPerPage: 2,
  articles: { pathname: 'article' },
  post: { pathname: '' },
};

export const DEFAULT_LANGUAGE = 'de';
export const LANGUAGES = ['de'];
