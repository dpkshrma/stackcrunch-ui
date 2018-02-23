import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: -48px;
`;

export const Box = styled.div`
  position: absolute;
  top: ${({ top = 0 }) => `${top}px`};
  left: ${({ left = 0 }) => `${left}px`};
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 100;

  border-radius: 2px;
  width: ${({ size = 40 }) => `${size}px`};
  height: ${({ size = 40 }) => `${size}px`};
  background-color: #eee;
`;
