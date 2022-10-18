export const SITE = {
  name: 'Kitas der Gemeinde Hörsel',

  origin: 'https://tobias-kaerst.de',
  basePathname: '/',

  title: 'Kindertagesstädten Hörsel',
  description:
    'Die Kindergärten Dreikäsehoch Mechterstädt und Kleine Strolche Teutleben sind die zwei kommunalen Kindergarteneinrichtung der Gemeinde Hörsel.',
};

export const ROUTES = { teutlebenLanding: '/teutleben', mechterstaedtLanding: '/mechterstaedt' };

export const PAGES = Object.values(ROUTES).map((page) => SITE.origin + page);

export const DEFAULT_LANGUAGE = 'de-DE';
export const LANGUAGES = ['de-DE'];
