import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const Container = styled.div`
  padding: 12px 80px;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  border-top: 4px solid #ff6f00;
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
  text-decoration: none;
  display: flex;
  margin-left: 16px;
  border: 1px solid #555;
  font-family: roboto;
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

const Header = () => (
  <Container>
    <Logo.Icon />
    <Logo.Text />
    <ContributeTip href="/posts" target="_blank">
      <Tip />
      Contributions Welcome!
    </ContributeTip>
  </Container>
);

export default Header;
