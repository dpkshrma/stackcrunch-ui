import React from 'react';
import styled, { keyframes } from 'styled-components';
import Logo from './Logo';

const Container = styled.div`
  background-color: #202126;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const bounceAnimation = keyframes`
  from {
    transform: translateY(-24px);
  }
  to {
    transform: translateY(-14px);
  }
`;
const Floater = styled.div`
  animation: ${bounceAnimation} 1.2s infinite alternate;
`;
const scaleAnimation = keyframes`
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1.0);
  }
`;
const Shadow = styled.div`
  width: 40px;
  margin-top: 4px;
  margin-bottom: 20px;
  height: 0px;
  border-radius: 100%;
  box-shadow: 0 0 20px 5px #fff4;
  animation: ${scaleAnimation} 1.2s infinite alternate;
`;
const LoadText = styled.div`
  color: #aaa;
  font-size: 18px;
  font-weight: 100;
  text-align: center;
  letter-spacing: 1px;
  font-family: roboto;
`;
const Loading = () => {
  return (
    <Container>
      <Floater>
        <Logo.Icon />
      </Floater>
      <Shadow />
      <LoadText>
        <span className="text">Nice things come to those who wait :)</span>
      </LoadText>
    </Container>
  );
};

export default Loading;
