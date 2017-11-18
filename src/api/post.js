import { req } from '../helpers/http';

const fetchAllPosts = page => {
  return req('posts')
    .get({ page })
    .then(({ posts }) => posts);
};

export const fetchOnePost = slug => {
  return req(`posts/${slug}`)
    .get()
    .then(({ post }) => post);
};

export const postsAPI = {
  fetchAll: fetchAllPosts,
  fetchOne: fetchOnePost
};
