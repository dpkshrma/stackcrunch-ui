import { req } from '../helpers/http';

const fetchAllPosts = page => {
  return req('posts')
    .get({ page })
    .then(({ posts }) => posts);
};

export const postsAPI = {
  fetchAll: fetchAllPosts
};
