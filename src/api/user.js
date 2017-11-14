import { STACKCRUNCH_API_URL, STACKCRUNCH_TOKEN_ID } from '../config';

const fetchProfile = () => {
  const url = `${STACKCRUNCH_API_URL}/profile`;
  const authToken = localStorage.getItem(STACKCRUNCH_TOKEN_ID);
  const opts = {
    method: 'GET',
    headers: { Authorization: authToken }
  };
  return fetch(url, opts).then(response => response.json());
};

const updateProfile = profile => {
  const url = `${STACKCRUNCH_API_URL}/profile`;
  const authToken = localStorage.getItem(STACKCRUNCH_TOKEN_ID);
  const opts = {
    method: 'post',
    headers: {
      Authorization: authToken,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user: profile })
  };
  return fetch(url, opts).then(response => response.json());
};

const uploadProfilePhoto = file => {
  const url = `${STACKCRUNCH_API_URL}/profile/photo`;
  const authToken = localStorage.getItem(STACKCRUNCH_TOKEN_ID);
  const form = new FormData();
  form.append('avatar', file);
  const opts = {
    method: 'post',
    headers: { Authorization: authToken },
    body: form
  };
  return fetch(url, opts).then(response => response.json());
};

export const profileAPI = {
  fetch: fetchProfile,
  update: updateProfile,
  uploadPhoto: uploadProfilePhoto
};
