const getPage = page => {
  try {
    const { data } = require(`./data/pages/${page}.json`);
    return data;
  } catch (e) {
    // page not found
  }
  return [];
};

export default {
  getPage
};
