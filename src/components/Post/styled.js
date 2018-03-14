import React from 'react';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Post = styled.div`
  max-width: 740px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderMeta = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderMetaText = styled.div`
  font-size: 12px;
  margin-left: 8px;
  color: #777;
`;

export const Title = styled.h1`
  position: relative;
  color: #555;
  font-size: 40px;
  font-weight: 300;
  margin: 16px 0;
  text-decoration: none;
  padding-bottom: 2px;
  cursor: default;
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

export const Content = styled.div``;

export const Separator = ({ space, delimiter }) => {
  const Span = styled.span`
    margin: 0 ${space}px;
  `;
  return <Span>{delimiter}</Span>;
};

export const authorCSS = {
  wrapper: css``,
  thumb: css`
    border-radius: 0;
  `,
  content: css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    color: #444;
    &:hover {
      color: #000;
    }
  `
};
