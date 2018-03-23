import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Button = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  outline: none;
  background: none;
  border: 1px solid #fff;
  border-radius: 2px;
  padding: 8px 16px;
  color: #fff;
  cursor: pointer;
  margin-left: 8px;
  opacity: 0.9;
  letter-spacing: 0.09em;
  &:hover {
    opacity: 1;
  }
`;
const SignUpBtn = styled(Button)`
  background: #fff;
  color: #333;
  margin-right: 32px;
`;
const SignInBtn = styled(Button)`
  margin-left: auto;
`;

const Tip = styled.div`
  height: 8px;
  width: 8px;
  transform: rotate(135deg);
  position: absolute;
  margin-left: -11px;
  margin-top: 3px;
  background: #555;
  border-right: 1px solid;
  border-bottom: 1px solid;
  border-color: #555;
`;
const ContributeTip = styled.a`
  background: #555;
  color: #fff;
  border-radius: 2px;
  font-size: 14px;
  padding: 6px;
  padding-right: 0;
  text-decoration: none;
  display: flex;
  margin-left: 16px;
  border: 1px solid #555;
  font-family: roboto;
  font-weight: 300;
  letter-spacing: 1px;
  line-height: 16px;
  & svg {
    margin-top: -2px;
    margin-left: 4px;
  }
  &:hover,
  &:hover ${Tip} {
    background: #666;
    color: #fff;
    .icon {
      fill: #fff;
    }
  }
  &:hover {
    box-shadow: 1px 0px 2px 1px #222;
  }
`;
const Container = styled.div`
  padding: 20px 80px;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  @media (max-width: 1439px) {
    max-width: calc(100vw - 160px);
  }
  @media (min-width: 1440px) {
    max-width: calc(1440px - 160px);
  }
  @media (max-width: 479px) {
    max-width: calc(100vw - 40px);
    padding: 12px 20px;
    & ${ContributeTip} {
      display: none;
    }
  }
`;

const Header = () => (
  <Container>
    <Logo.Icon />
    <Logo.Text />
    <ContributeTip
      href="/post/How-to-share-your-awesome-development-stories-r1lZ_1hJcz"
      target="_blank"
    >
      <Tip />
      ⚡Get Early Access! ⚡
    </ContributeTip>
    <SignInBtn to={'/join?tab=signin'}>Login</SignInBtn>,
    <SignUpBtn to={'/join?tab=signup'}>SignUp</SignUpBtn>
  </Container>
);

export default Header;
