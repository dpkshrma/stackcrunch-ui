import { req } from '../helpers/http';

const fetchQuestion = url => {
  return req('questions').get({ url });
};

export const questionApi = {
  fetch: fetchQuestion
};
