import { req } from '../helpers/http';
import { dataURItoBlob } from '../utils/image';

const fetchAll = ({ page, username, isDraft } = {}) => {
  let endpoint = 'posts';
  if (isDraft) {
    endpoint = 'posts/drafts';
  }
  return req(endpoint).get({ page, username, isDraft });
};

const fetchOne = slug => {
  return req(`posts/${slug}`)
    .get()
    .then(({ post }) => post);
};

const create = postInput => {
  return req('posts').post(postInput);
};

const update = ({ slug, post }) => {
  return req(`posts/${slug}`).put(post);
};

const uploadCoverImage = file => {
  const form = new FormData();
  form.append('coverImage', file);
  return req('posts/cover').postFormData(form);
};

export default {
  fetchAll,
  fetchOne,
  create,
  update,
  uploadCoverImage
};
