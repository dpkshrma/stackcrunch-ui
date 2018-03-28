import React from 'react';
import queryString from 'query-string';
import { STACKCRUNCH_TOKEN_ID } from '../../config';
import { fetchProfile } from '../../actions/user';
import store from '../../store';

class Redirect extends React.Component {
  constructor(props) {
    super(props);
    this.storeTokenInLS();
    this.updateProfilePhoto();
  }
  getQueryParam = param => {
    const { location: { search } = {} } = document;
    const value = (queryString.parse(search) || {})[param];
    return value;
  };
  storeTokenInLS = () => {
    const token = this.getQueryParam('token');
    if (token) {
      localStorage.setItem(STACKCRUNCH_TOKEN_ID, token);
    }
  };
  updateProfilePhoto = () => {
    if (localStorage.getItem(STACKCRUNCH_TOKEN_ID)) {
      store.dispatch(fetchProfile());
    }
  };
}

export default Redirect;
