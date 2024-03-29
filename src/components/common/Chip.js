import React from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import styled from 'styled-components';
import {
  Wrapper,
  Thumb,
  Text,
  contentCSS,
  OutLink,
  InLink,
  CloseIcon,
  DefaultImg
} from './styled';

const Chip = ({
  img,
  useDefaultImg,
  text,
  to,
  href,
  css = {},
  onCloseClick
}) => {
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
        {!img && useDefaultImg && <DefaultImg />}
        <Text css={css.text}>{text}</Text>
        {onCloseClick && <CloseIcon onClick={onCloseClick} />}
      </Content>
    </Wrapper>
  );
};

export default Chip;
