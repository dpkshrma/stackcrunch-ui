export { default as asyncLoad } from './asyncLoading';
export { default as hooks } from './hooks';
export { default as routeAnimation } from './transitionAnimation';

export const getURLSegments = urlPath => {
  return urlPath.split('/').filter(segment => segment.length > 0);
};
