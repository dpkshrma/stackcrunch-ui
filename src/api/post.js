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

const uploadCoverImage = dataUri => {
  const form = new FormData();
  const blob = dataURItoBlob(dataUri);
  const file = new File([blob], 'coverImage.png', { type: 'image/png' });
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
