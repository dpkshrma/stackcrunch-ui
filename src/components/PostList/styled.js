import styled from 'styled-components';
import { Button, Alert } from '../common';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`;
export const EndOfListMsg = Alert.extend`
  text-align: center;
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
