import metadata from './data/meta.json';

const getPost = postId => {
  const postPath = `./data/posts/${postId}.json`;
  return import(postPath);
};

const getPostIds = () => {
  return metadata.posts;
};

export default {
  getPost,
  getPostIds
};
