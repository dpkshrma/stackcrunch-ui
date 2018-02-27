import React from 'react';
import styled, { keyframes } from 'styled-components';

const Text = styled.div`
  font-size: 20px;
  font-weight: 100;
  font-family: roboto;
  letter-spacing: 1px;
`;
const bounceAnimation = keyframes`
  from {
    transform: translateY(-24px);
  }
  to {
    transform: translateY(-14px);
  }
`;
const JumpingArrow = styled.div`
  animation: ${bounceAnimation} 1s infinite alternate;
  font-size: 40px;
`;
const Container = styled.div`
  position: absolute;
  margin: auto;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 120;
  & * {
    color: #fff;
  }
  &:hover * {
    text-shadow: 0 0 10px #fff;
  }
`;
const KnowMore = () => {
  return (
    <Container>
      <Text>Know More</Text>
      <JumpingArrow>&#8964;</JumpingArrow>
    </Container>
  );
};

export default KnowMore;
