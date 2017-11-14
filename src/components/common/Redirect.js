import React from 'react';
import queryString from 'query-string';
import { STACKCRUNCH_TOKEN_ID } from '../../config';
import { updateProfile } from '../../actions/user';
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
    const avatarURL = this.getQueryParam('avatarURL');
    if (avatarURL) {
      store.dispatch(updateProfile({ avatarURL }));
    }
  };
}

export default Redirect;
