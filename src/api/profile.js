import { STACKCRUNCH_API_URL, STACKCRUNCH_TOKEN_ID } from '../config';

export const fetchProfile = () => {
  const url = `${STACKCRUNCH_API_URL}/profile`;
  const authToken = localStorage.getItem(STACKCRUNCH_TOKEN_ID);
  const opts = {
    method: 'GET',
    headers: { Authorization: authToken }
  };
  return fetch(url, opts).then(response => response.json());
};

export const updateProfile = profile => {
  const url = `${STACKCRUNCH_API_URL}/profile`;
  const authToken = localStorage.getItem(STACKCRUNCH_TOKEN_ID);
  delete profile.avatarURL;
  console.log(profile);
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
