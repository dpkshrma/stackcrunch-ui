import { req } from '../helpers/http';

const fetchAll = ({ page, username, isDraft } = {}) => {
  let endpoint = 'posts';
  if (isDraft) {
    endpoint = 'posts/drafts';
  }
  return req(endpoint)
    .get({ page, username, isDraft })
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
