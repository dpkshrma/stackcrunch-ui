import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  border-radius: 2px;
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

export const StyledLink = styled(Link)`
  position: relative;
  color: #07c;
  font-size: 24px;
  font-weight: 300;
  line-height: 36px;
  letter-spacing: 0.5px;
  text-decoration: none;
  padding-bottom: 2px;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 119, 204, 0.3);
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }
  &:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`;
