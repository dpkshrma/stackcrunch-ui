const getPage = page => {
  return import(`./data/pages/${page}.json`);
};

const getPageIds = () => {
  const { published: publishedPages } = require('./data/pages.json');
  return publishedPages.map(fileName => fileName.split('.')[0]);
};

export default {
  getPage,
  getPageIds
};
