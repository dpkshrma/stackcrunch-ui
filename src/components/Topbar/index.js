import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import logo from './icons/logo.png';
import GithubIcon from './icons/github';
import { GH_CONTRIBUTION_URL } from '../../config';

const Wrapper = styled.div`
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -2px rgba(0, 0, 0, 0.2);
  padding: 16px;
  display: flex;
  justify-content: center;
  background: #fff;
`;
const Content = styled.div`
  height: 32px;
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
  color: #333;
`;
const Text = styled.span`
  font-family: roboto;
  font-size: ${({ size }) => `${size || 20}px`};
  font-weight: ${({ weight }) => weight};
`;
const RightNav = styled.div`
  margin-left: auto;
`;
const Button = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  outline: none;
  background: #fff;
  border: 1px solid #0095ff;
  border-radius: 2px;
  padding: 8px 16px;
  color: #07c;
  cursor: pointer;
  margin-left: 8px;
  &:hover {
    background: #eaf5fd;
  }
  ${({ css }) => css};
`;
const signUpCSS = css`
  background: #0095ff;
  color: #fff;
  &:hover {
    background: #0585e2;
  }
`;
const ContributeTip = styled.a`
  background: #fff;
  color: #555;
  border-radius: 2px;
  font-size: 12px;
  padding: 6px;
  text-decoration: none;
  display: flex;
  margin-left: 16px;
  border: 1px solid #555;
  & svg {
    margin-top: -2px;
    margin-left: 4px;
  }
  &:hover,
  &:hover .bullet {
    background: #555;
    color: #fff;
    .icon {
      fill: #fff;
    }
  }
`;
const Bullet = styled.div`
  height: 8px;
  width: 8px;
  transform: rotate(135deg);
  position: absolute;
  margin-left: -11px;
  margin-top: 3px;
  background: #fff;
  border-right: 1px solid;
  border-bottom: 1px solid;
  border-color: #555;
`;

const Topbar = props => {
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
        <ContributeTip href={GH_CONTRIBUTION_URL} target="_blank">
          <Bullet className="bullet" />
          Contribute on <GithubIcon className="icon" height={16} />
        </ContributeTip>
        <RightNav>
          <Button to={'/join?tab=signin'}>SignIn</Button>
          <Button to={'/join?tab=signup'} css={signUpCSS}>
            SignUp
          </Button>
        </RightNav>
      </Content>
    </Wrapper>
  );
};

export default Topbar;
