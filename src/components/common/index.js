import styled from 'styled-components';

export { default as Chip } from './Chip';
export { default as Loader } from './Loader';
export { default as InfiniteList } from './InfiniteList';
export { default as hooked } from './hooked';

// TODO: Add success/failure/default colors
export const Alert = styled.div`
  background: #e9e9e9;
  padding: 8px;
  color: #555;
  font-size: 12px;
  font-family: roboto;
  margin: 8px 0;
  border-radius: 4px;
  cursor: default;
  &:hover {
    color: #444;
    background: #e3e3e3;
  }
`;

export const Button = styled.button`
  text-decoration: none;
  font-size: 14px;
  outline: none;
  background: #fff;
  border: 1px solid #0095ff;
  border-radius: 2px;
  padding: 8px 16px;
  color: #07c;
  cursor: pointer;
  margin-right: 16px;
  &:hover {
    background: #eaf5fd;
  }
`;
