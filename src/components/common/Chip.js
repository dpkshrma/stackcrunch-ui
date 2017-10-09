import React from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import styled from 'styled-components';
import { Wrapper, Thumb, Text, contentCSS, OutLink, InLink } from './styled';

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
