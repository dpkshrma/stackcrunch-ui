import { req } from '../helpers/http';

const fetchProfile = () => {
  return req('profile').get();
};

const updateProfile = user => {
  return req('profile').post({ user });
};

const uploadProfilePhoto = file => {
  const form = new FormData();
  form.append('avatar', file);
  return req('profile/photo').postFormData(form);
};

export const profileAPI = {
  fetch: fetchProfile,
  update: updateProfile,
  uploadPhoto: uploadProfilePhoto
};
