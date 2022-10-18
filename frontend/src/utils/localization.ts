import { DEFAULT_LANGUAGE, LANGUAGES } from '~/config';

declare global {
  interface String {
    tr({ lang, values }?: { lang?: string; values?: unknown[] }): string;
  }
}

const translations = new Map();
for (let i = 0; i < LANGUAGES.length; i += 1) {
  const lang = LANGUAGES[i];
  translations.set(lang, (await import(`../assets/translations/${lang}.json`)).default);
}

const traverseObject = (obj: object | string, keys: string[], position = 0): string | undefined => {
  if (typeof obj === 'string') return obj;
  const key = keys[position];
  if (!Object.prototype.hasOwnProperty.call(obj, key)) return undefined;
  return traverseObject(obj[key], keys, position + 1);
};

String.prototype.tr = function tr(this: string, { lang = DEFAULT_LANGUAGE, values = [] } = {}) {
  let value = traverseObject(translations.get(lang), this.split('.')) ?? this;
  for (let i = 0; i < values.length; i += 1) {
    value = value.replace(`{${i}}`, values[i].toString());
  }
  return value;
};
