export type Lang = 'en' | 'ar';

export type Tr<T> = {
  [key in Lang]: T;
};
