import queryString from 'query-string';
import { STACKCRUNCH_API_URL, STACKCRUNCH_TOKEN_ID } from '../config';

export const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const fetchJSON = (url, opts) => {
  return fetch(url, opts)
    .then(response => response.json())
    .catch(err => {
      console.error(err);
      throw err;
    });
};

export const req = (path, { headers = {}, auth = true } = {}) => {
  const url = `${STACKCRUNCH_API_URL}/${path}`;
  const opts = { headers };
  if (auth) {
    const authToken = localStorage.getItem(STACKCRUNCH_TOKEN_ID);
    opts.headers.Authorization = authToken;
  }
  return {
    get: (queryParams = {}) => {
      const query = queryString.stringify(queryParams);
      opts.method = 'GET';
      return fetchJSON(`${url}?${query}`, opts);
    },
    post: body => {
      opts.method = 'POST';
      opts.body = JSON.stringify(body);
      opts.headers = Object.assign({}, opts.headers, jsonHeaders);
      return fetchJSON(url, opts);
    },
    postFormData: body => {
      opts.method = 'POST';
      opts.body = body;
      return fetchJSON(url, opts);
    },
    put: body => {
      opts.method = 'PUT';
      opts.body = JSON.stringify(body);
      opts.headers = Object.assign({}, opts.headers, jsonHeaders);
      return fetchJSON(url, opts);
    }
  };
};
