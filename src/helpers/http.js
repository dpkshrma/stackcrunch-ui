import { STACKCRUNCH_API_URL, STACKCRUNCH_TOKEN_ID } from '../config';

export const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const fetchJSON = (url, opts) =>
  fetch(url, opts).then(response => response.json());

export const req = (path, headers = {}, auth = true) => {
  const url = `${STACKCRUNCH_API_URL}/${path}`;
  const opts = { headers };
  if (auth) {
    const authToken = localStorage.getItem(STACKCRUNCH_TOKEN_ID);
    opts.headers.Authorization = authToken;
  }
  return {
    get: () => {
      opts.method = 'GET';
      return fetchJSON(url, opts);
    },
    post: body => {
      opts.method = 'POST';
      opts.body = body;
      return fetchJSON(url, opts);
    }
  };
};
