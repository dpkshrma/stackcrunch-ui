import { req } from '../helpers/http';

const submit = email => {
  return req('subscribe').post({ email });
};

export default {
  submit
};
