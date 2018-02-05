import { req } from '../helpers/http';

const fetchAll = page => {
  return req('posts')
    .get({ page })
    .then(({ posts }) => posts);
};

const fetchOne = slug => {
  return req(`posts/${slug}`)
    .get()
    .then(({ post }) => post);
};

const create = postInput => {
  return req('posts').post(postInput);
};

export default {
  fetchAll,
  fetchOne,
  create
};
