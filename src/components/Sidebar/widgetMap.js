import React from 'react';
import Subscribe from './Subscribe';
import References from './References';
import Author from './Author';
import { WIDGET_TYPES } from '../../config';

export default {
  [WIDGET_TYPES.subscribe]: ({ props = {}, key }) => (
    <Subscribe {...props} key={key} />
  ),
  [WIDGET_TYPES.authorInfo]: ({ props = {}, key }) => (
    <Author {...props} key={key} />
  ),
  [WIDGET_TYPES.ref]: ({ props = {}, key }) => {
    if (!props.refs) {
      return null;
    }
    return <References {...props} key={key} />;
  }
};
