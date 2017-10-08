import React from 'react';
import styled from 'styled-components';
import logo from './logo.png';

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
const Logo = styled.img`
  height: 28px;
`;
const Text = styled.span`
  font-family: roboto;
  font-size: ${({ size }) => `${size || 20}px`};
  font-weight: ${({ weight }) => weight};
`;
const LogoText = styled.div`
  margin-left: 8px;
  color: #333;
`;

const Topbar = props => {
  return (
    <Wrapper>
      <Content>
        <Logo src={logo} />
        <LogoText>
          <Text weight={300}>stack</Text>
          <Text weight={500}>crunch</Text>
        </LogoText>
      </Content>
    </Wrapper>
  );
};

export default Topbar;
