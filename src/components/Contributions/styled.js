import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PenIcon from '../icons/Pen';
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

export const EditButton = ({ onClick, to }) => {
  const Text = styled.span`
    margin-left: 4px;
  `;
  const EditIcon = styled(PenIcon)`
    fill: #999;
  `;
  const Container = styled(Link)`
    cursor: pointer;
    display: flex;
    font-size: 14px;
    color: #999;
    margin-left: auto;
    text-decoration: none;
    &:hover {
      ${EditIcon} {
        fill: #777;
      }
      ${Text} {
        color: #777;
      }
    }
  `;
  return (
    <Container onClick={onClick} to={to}>
      <EditIcon height={14} />
      <Text>Edit</Text>
    </Container>
  );
};
