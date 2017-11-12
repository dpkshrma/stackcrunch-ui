export const pick = (original, ...keys) => {
  return keys.reduce((partial, key) => {
    if (original.hasOwnProperty(key)) partial[key] = original[key];
    return partial;
  }, {});
};

export const omit = (original, ...keys) => {
  return keys.reduce((partial, key) => {
    if (partial.hasOwnProperty(key)) delete partial[key];
    return partial;
  }, Object.assign({}, original));
};
