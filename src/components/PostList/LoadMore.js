import React from 'react';
import { Button, Loader } from '../common';

const LoadMore = ({ isLoading, onClick }) => {
  const LoadMoreButton = Button.extend`
    text-align: center;
    border-color: #bababa;
    color: #444;
    &:hover {
      background-color: #f9f9f9;
      color: #111;
    }
  `;
  const LoaderButton = LoadMoreButton.extend`
    background-color: #f9f9f9;
    cursor: wait;
  `;
  if (isLoading) {
    return (
      <LoaderButton>
        <Loader />
      </LoaderButton>
    );
  }
  return <LoadMoreButton onClick={onClick}>Load More Posts</LoadMoreButton>;
};

export default LoadMore;
