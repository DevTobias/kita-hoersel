/* eslint-disable @typescript-eslint/no-explicit-any */

const load = async () => {
  return import.meta.glob('~/../data/images/**');
};

let images: Record<string, () => Promise<unknown>>;

export const fetchLocalImages = async () => {
  images = images || (await load());
  return images;
};

export const findImage = async (path: string): Promise<string> => {
  const localImages = await fetchLocalImages();
  return ((await localImages[path]()) as any).default.src;
};
