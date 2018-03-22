import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../common';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`;
export const Heading = styled.h2`
  font-size: 24px;
  font-family: roboto;
  font-weight: 300;
  color: #f78d3d;
  padding-bottom: 12px;
  border-bottom: 1px solid #efefef;
`;
export const LoadMoreButton = Button.extend`
  text-align: center;
  border-color: #bababa;
  width: 100%;
  color: #444;
  &:hover {
    background-color: #f9f9f9;
    color: #111;
  }
`;
export const LoaderButton = LoadMoreButton.extend`
  background-color: #f9f9f9;
  cursor: wait;
`;
