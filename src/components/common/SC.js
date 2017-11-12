import React from 'react';
import queryString from 'query-string';
import { STACKCRUNCH_TOKEN_ID } from '../../config';

export default class SC extends React.Component {
  constructor(props) {
    super(props);
    const { location = {} } = this.props;
    if (location.search) {
      const { token } = queryString.parse(location.search) || {};
      if (token) {
        localStorage.setItem(STACKCRUNCH_TOKEN_ID, token);
      }
    }
  }
}
