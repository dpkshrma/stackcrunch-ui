import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  max-width: 682px;
  margin: 16px 0;
  padding: 16px;
  box-shadow: 0 0 8px -4px;
  border-radius: 4px;
  display: flex;
  ${props =>
    props.showBorder &&
    css`
      border-bottom: 1px solid #ddd;
    `};
`;

export const Content = styled.div`
  flex: 5;
`;

export const CoverImage = props => {
  const Img = styled.img`
    height: 200px;
  `;
  const Container = styled.div`
    position: relative;
    flex: 2;
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin-right: 20px;
  `;
  return (
    <Container>
      <Img {...props} />
    </Container>
  );
};

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderMetaText = styled.div`
  font-size: 12px;
  color: #777;
`;

export const Abstract = styled.div`
  font-size: 14px;
  font-weight: normal;
  line-height: 26px;
  color: #222;
  margin-bottom: 8px;
`;

export const Tags = styled.div`
  display: flex;
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
`;
export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;
export const MetaLabel = styled.span`
  color: #777;
  font-size: 12px;
  margin-left: 4px;
`;

export const Title = styled(Link)`
  position: relative;
  color: #07c;
  font-size: 22px;
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

export const ShareLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  filter: grayscale(1);
  &:hover {
    filter: grayscale(0);
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Separator = ({ color = '#777', size = 12, space, delimiter }) => {
  const Span = styled.span`
    font-size: ${size}px;
    margin: 0 ${space}px;
    color: ${color};
  `;
  return <Span>{delimiter}</Span>;
};

export const tagCSS = {
  text: css`
    font-size: 12px;
  `,
  content: css`
    border-color: rgba(246, 155, 85, 1);
    margin-right: 8px;
    height: 20px;
    &:hover {
      background: rgba(246, 155, 85, 0.2);
      color: #444;
    }
  `
};

export const authorCSS = {
  wrapper: css`
    margin-bottom: 4px;
    margin-right: 8px;
  `,
  thumb: css`
    border-radius: 0;
  `,
  content: css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-color: #bbb;
    color: #555;
    &:hover {
      border-color: #888;
      color: #000;
    }
  `
};
