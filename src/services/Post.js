import metadata from './data/meta.json';

const { pages } = metadata;

const getPage = (page, type) => {
  return import(`./data/pages/${type || '_main'}/${page}.json`);
};

const getMainPageIds = () => {
  return pages._main.map(fileName => fileName.split('.')[0]);
};

const getTaggedPageIds = tagId => {
  if (Object.keys(pages).indexOf(tagId) === -1) {
    throw new Error(`Tag '${tagId}' not found`);
  }
  return pages[tagId].map(fileName => fileName.split('.')[0]);
};

const getTags = () => {
  const specialIds = ['_main', '_user'];
  return Object.keys(pages).filter(id => specialIds.indexOf(id) === -1);
};

export default {
  getPage,
  getMainPageIds,
  getTags,
  getTaggedPageIds
};
