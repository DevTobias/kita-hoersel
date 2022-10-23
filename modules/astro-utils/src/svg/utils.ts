/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-cond-assign */

import { optimize as optimizeSvgo, OptimizedSvg } from 'svgo';

import { Props } from './Props';

const ASSET_NAMESPACE = 'kita';
const preprocessCache = new Map();
const splitAttrsTokenizer = /([a-z0-9_:-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer =
  /(?:<(\/?)([a-zA-Z][a-zA-Z0-9:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<!--)([\s\S]*?)(-->)|(<!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;

const optimizeSvgAsset = (contents: string, name: string): string => {
  const optimizedAsset = optimizeSvgo(contents, {
    plugins: [
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
      'removeXMLNS',
      'removeEditorsNSData',
      'cleanupAttrs',
      'minifyStyles',
      'convertStyleToAttrs',
      {
        name: 'cleanupIDs',
        params: { prefix: `${ASSET_NAMESPACE}:${name}` },
      },
      'removeRasterImages',
      'removeUselessDefs',
      'cleanupNumericValues',
      'cleanupListOfValues',
      'convertColors',
      'removeUnknownsAndDefaults',
      'removeNonInheritableGroupAttrs',
      'removeUselessStrokeAndFill',
      'removeViewBox',
      'cleanupEnableBackground',
      'removeHiddenElems',
      'removeEmptyText',
      'convertShapeToPath',
      'moveElemsAttrsToGroup',
      'convertPathData',
      'convertTransform',
      'removeEmptyAttrs',
      'removeEmptyContainers',
      'mergePaths',
      'removeUnusedNS',
      'sortAttrs',
      'removeTitle',
      'removeDesc',
      'removeDimensions',
      'removeScriptElement',
    ],
  });

  return (optimizedAsset as OptimizedSvg).data;
};

const splitAttrs = (str: string) => {
  const res: Record<string, unknown> = {};
  let token: RegExpExecArray | null;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = ` ${str || ''} `;
    while ((token = splitAttrsTokenizer.exec(str))) {
      res[token[1]] = token[3];
    }
  }
  return res;
};

const preprocess = (contents: string, name: string, optimize: boolean) => {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  contents = optimize ? optimizeSvgAsset(contents, name) : contents;

  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while ((token = domParserTokenizer.exec(contents))) {
      const tag = token[2];
      if (tag === 'svg') {
        const attrs = splitAttrs(token[3]);
        result = contents
          .slice(domParserTokenizer.lastIndex)
          .replace(/<\/svg>/gim, '')
          .trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }

  return '';
};

const toAttributeSize = (size: string | number) => String(size).replace(/(?<=\d)x$/, 'em');

export function normalizeProps(inputProps: Props) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : undefined;
  const height = h ? toAttributeSize(h) : undefined;
  return { ...inputProps, width, height };
}

export const loadSvg = async (name: string, optimize: boolean, inputProps: Props) => {
  const filepath = `/src/assets/icons/${name}.svg`;

  // @ts-ignore
  const files = import.meta.globEager('/src/assets/icons/**/*.svg', { as: 'raw' });

  if (!(filepath in files)) {
    throw new Error(`Could not find the file "${filepath}"`);
  }

  const { innerHTML, defaultProps } = preprocess(files[filepath], name, optimize);

  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) },
  };
};
