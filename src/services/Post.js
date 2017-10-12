const getPage = page => {
  return import(`./data/pages/${page}.json`);
};

export default {
  getPage,
  getPageIds
};
