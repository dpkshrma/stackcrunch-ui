import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import logo from '../icons/logo_white.png';
import StackExchangeIcon from './icons/stackexchange';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  background: #333;
  margin-top: 48px;
  bottom: 0;
`;
const Content = styled.div`
  height: 96px;
  width: 100%;
  max-width: 945px;
  display: flex;
  align-items: center;
`;
const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;
const LogoThumb = styled.img`
  height: 28px;
`;
const LogoText = styled.div`
  margin-left: 8px;
  color: #292929;
`;
const Text = styled.span`
  font-family: roboto;
  font-size: ${({ size }) => `${size || 20}px`};
  font-weight: ${({ weight }) => weight};
  color: #fff;
  ${({ css }) => css};
`;
const RightNav = styled.div`
  margin-left: auto;
`;
const SELink = styled.a`
  text-decoration: none;
`;
const footerLabelCSS = css`
  color: #ddd;
  letter-spacing: 0.1em;
`;

const Footer = props => {
  return (
    <Wrapper>
      <Content>
        <Logo to="/">
          <LogoThumb src={logo} />
          <LogoText>
            <Text weight={300}>stack</Text>
            <Text weight={500}>crunch</Text>
          </LogoText>
        </Logo>
        <RightNav>
          <Text css={footerLabelCSS} size={16} weight={100}>
            Made in honour of
            <SELink
              href="https://stackexchange.com/"
              target="_blank"
              title="stackexchange"
            >
              <StackExchangeIcon height={24} />
            </SELink>
            contributors
          </Text>
        </RightNav>
      </Content>
    </Wrapper>
  );
};

export default Footer;
