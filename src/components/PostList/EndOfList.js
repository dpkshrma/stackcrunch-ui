import React from 'react';
import { Alert } from '../common';

const EndOfList = () => {
  const CustomAlert = Alert.extend`
    text-align: center;
  `;
  return <CustomAlert>No more posts to show</CustomAlert>;
};

export default EndOfList;
