import metadata from './data/meta.json';

const { pages } = metadata;

const getPage = (pageId, type, typeId) => {
  let pagePath = './data/pages';
  // type of page: main/tags/authors
  let pageType = type;
  if (!type) {
    pageType = 'main';
  }
  pagePath += `/${pageType}`;
  // author/tag id
  if (typeId) {
    pagePath += `/${typeId}`;
  }
  return import(`${pagePath}/${pageId}.json`);
};

const getMainPageIds = () => {
  return pages.main.pages;
};

const getSpecialPageTypeIds = pageType => {
  return Object.keys(pages[pageType] || {});
};

const getSpecialPageIds = (pageType, pageTypeId) => {
  if (getSpecialPageTypeIds(pageType).indexOf(pageTypeId) === -1) {
    throw new Error(`'${pageType}' '${pageTypeId}' not found`);
  }
  return pages[pageType][pageTypeId].pages;
};

export default {
  getPage,
  getMainPageIds,
  getSpecialPageTypeIds,
  getSpecialPageIds
};
