import { req, jsonHeaders } from '../helpers/http';

const fetchProfile = () => {
  return req('profile').get();
};

const updateProfile = user => {
  return req('profile', jsonHeaders).post(JSON.stringify({ user }));
};

const uploadProfilePhoto = file => {
  const form = new FormData();
  form.append('avatar', file);
  return req('profile/photo').post(form);
};

export const profileAPI = {
  fetch: fetchProfile,
  update: updateProfile,
  uploadPhoto: uploadProfilePhoto
};
