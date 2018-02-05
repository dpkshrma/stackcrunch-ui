import { req } from '../helpers/http';

const fetchAll = name => {
  return req('tags')
    .get({ name })
    .then(({ tags }) => tags);
};

export default {
  fetchAll
};
