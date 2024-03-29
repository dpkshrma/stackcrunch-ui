import queryString from 'query-string';
import { HTTPError } from './error';
import { STACKCRUNCH_API_URL, STACKCRUNCH_TOKEN_ID } from '../config';

export const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const fetchJSON = (url, opts) => {
  return fetch(url, opts).then(async response => {
    const { status, statusText } = response;

    const responseJSON = await response.json();
    const { message } = responseJSON;

    const statusType = status / 100;

    if (statusType !== 2 && statusType !== 3) {
      throw new HTTPError({
        name: statusText,
        message,
        status
      });
    }

    return responseJSON;
  });
};

export const req = (path, { headers = {}, auth = true } = {}) => {
  const url = `${STACKCRUNCH_API_URL}/${path}`;
  const opts = { headers };
  if (auth) {
    const authToken = localStorage.getItem(STACKCRUNCH_TOKEN_ID);
    if (authToken) {
      opts.headers.Authorization = authToken;
    }
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
    },
    delete: () => {
      opts.method = 'DELETE';
      return fetchJSON(url, opts);
    }
  };
};
