import React from 'react';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Post = styled.div`
  max-width: 740px;
  width: 100%;
  margin-top: 24px;
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
  padding-bottom: 2px;
  border-bottom: 1px solid #e0e0e0;
`;

export const DateString = styled.div`
  font-family: roboto;
  font-weight: 300;
  font-size: 12px;
  margin-bottom: 18px;
  letter-spacing: 2px;
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
