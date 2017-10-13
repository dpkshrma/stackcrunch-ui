import fetch from 'isomorphic-fetch';
import { SUBSCRIPTION_URL } from '../config';

export const subscribeUser = emailAddress => {
  const url = `${SUBSCRIPTION_URL}?email_address=${emailAddress}`;
  return fetch(url);
};
