// source: https://projects.lukehaas.me/css-loaders/
import styled, { keyframes } from 'styled-components';

const loadAnimation = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
`;

const Loader = styled.div`
  color: ${props => props.color || '#777'};
  font-size: ${props => (props.size ? `${props.size}px` : '4px')};
  top: -8px;
  margin: 4px auto;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;
  &,
  &::before,
  &::after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: ${loadAnimation} 1.8s infinite ease-in-out;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
  }
  &:before {
    left: -3.5em;
    animation-delay: -0.32s;
  }
  &:after {
    left: 3.5em;
  }
`;

export default Loader;
