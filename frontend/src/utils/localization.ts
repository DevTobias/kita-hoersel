/* eslint-disable @typescript-eslint/no-explicit-any */

import { DEFAULT_LANGUAGE, LANGUAGES } from '~/config';

declare global {
  interface String {
    tr({ lang, values }?: { lang?: string; values?: unknown[] }): Promise<string>;
    load({ lang, values }?: { lang?: string; values?: unknown[] }): Promise<any>;
  }
}

const translations = new Map();

const loadTranslations = async () => {
  for (let i = 0; i < LANGUAGES.length; i += 1) {
    const lang = LANGUAGES[i];
    translations.set(lang, (await import(`../../translations/${lang}.json`)).default);
  }
};

const traverseObject = (
  obj: object | string,
  keys: string[],
  position = 0
): string | any[] | object | undefined => {
  if (!obj) {
    return keys.join('.');
  }
  if (typeof obj === 'string' || Array.isArray(obj) || position >= keys.length) return obj;
  const key = keys[position];
  if (!Object.prototype.hasOwnProperty.call(obj, key)) return undefined;
  return traverseObject(obj[key], keys, position + 1);
};

String.prototype.tr = async function tr(
  this: string,
  { lang = DEFAULT_LANGUAGE, values = [] } = {}
) {
  if (translations.size === 0) {
    await loadTranslations();
  }
  let value: string = (traverseObject(translations.get(lang), this.split('.')) as string) ?? this;
  for (let i = 0; i < values.length; i += 1) {
    value = value.replace(`{${i}}`, values[i].toString());
  }
  return value;
};

String.prototype.load = async function load(this: string, { lang = DEFAULT_LANGUAGE } = {}) {
  if (translations.size === 0) {
    await loadTranslations();
  }
  return (traverseObject(translations.get(lang), this.split('.')) as any) ?? [];
};
