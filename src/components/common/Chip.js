import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import decorateComponentWithProps from 'decorate-component-with-props';

const Wrapper = styled.div`
  display: flex;
  ${({ css }) => css};
`;
const Thumb = styled.img`
  border-radius: 50%;
  height: 24px;
  ${({ css }) => css};
`;
const Text = styled.span`
  padding: 0 8px;
  font-size: 14px;
  ${({ css }) => css};
`;
const contentCSS = css`
  display: flex;
  align-items: center;
  color: #222;
  opacity: 0.7;
  height: 24px;
  border-radius: 12px;
  border: 1px solid #777;
  &:hover {
    opacity: 1;
  }
`;
const OutLink = styled.a`
  ${contentCSS} text-decoration: none;
  ${({ css }) => css};
`;
const InLink = styled(Link)`
  ${contentCSS} text-decoration: none;
  ${({ css }) => css};
`;

const Chip = ({ img, text, to, href, css = {} }) => {
  let Content = styled.div`
    ${contentCSS} ${({ css }) => css};
  `;
  if (to) {
    Content = decorateComponentWithProps(InLink, { to });
  } else if (href) {
    Content = decorateComponentWithProps(OutLink, { href, target: '_blank' });
  }
  return (
    <Wrapper css={css.wrapper}>
      <Content css={css.content}>
        {img && <Thumb src={img} css={css.thumb} />}
        <Text css={css.text}>{text}</Text>
      </Content>
    </Wrapper>
  );
};

export default Chip;
