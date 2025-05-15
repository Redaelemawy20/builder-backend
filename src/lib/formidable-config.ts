import formidable from 'formidable';

function createFormidableParser(options: formidable.Options = {}) {
  const form = formidable({
    ...options,
  });

  return form;
}
export function getFirst<T>(value: T | T[] | undefined): T | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default createFormidableParser;
