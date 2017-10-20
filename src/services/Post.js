import metadata from './data/meta.json';

const getPost = postId => {
  // NOTE: dynamic imports strictly require a string as input
  // Following will throw error - "module not found":
  // const postPath = `./data/posts/${postId}.json`;
  // return import(postPath);
  return import(`./data/posts/${postId}.json`);
};

const getPostIds = () => {
  return metadata.posts;
};

export default {
  getPost,
  getPostIds
};
