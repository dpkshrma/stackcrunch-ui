import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import logo from '../icons/logo_white.png';
import StackExchangeIcon from './icons/stackexchange';
import HeartIcon from '../icons/Heart';

const Container = styled.div`
  margin-top: auto;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  background: #333;
  margin-top: 24px;
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
  display: flex;
`;
const Text = styled.span`
  font-family: roboto;
  font-size: ${({ size }) => `${size || 20}px`};
  font-weight: ${({ weight }) => weight};
  color: #fff;
  display: flex;
  ${({ css }) => css};
`;
const RightNav = styled.div`
  margin-left: auto;
`;
const LoveIcon = styled(HeartIcon)`
  margin: 0 6px;
`;
const SEIcon = styled(StackExchangeIcon)`
  margin-top: -6px;
`;
const SELink = styled.a`
  text-decoration: none;
  color: #fff;
  display: flex;
`;
const footerLabelCSS = css`
  color: #ddd;
  letter-spacing: 0.1em;
`;

const Footer = props => {
  return (
    <Container>
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
              Made with <LoveIcon height={20} style={{ fill: '#d7594a' }} /> for
              <SELink
                href="https://stackexchange.com/sites"
                target="_blank"
                title="stackexchange"
              >
                <SEIcon height={24} />
                communities
              </SELink>
            </Text>
          </RightNav>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Footer;
