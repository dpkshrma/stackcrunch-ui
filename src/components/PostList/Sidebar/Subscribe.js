import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid #bee7ff;
  background: #f0f8ff;
  color: #333;
  padding: 16px;
`;
const Title = styled.h2`
  font-weight: 300;
  color: #07c;
`;
const Text = styled.span`
  font-size: 14px;
`;
const FormGroup = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  padding: 16px;
  font-size: 14px;
  margin-top: 24px;
  outline: none;
  border: 1px solid #3af;
  width: 100%;
`;
const Button = styled.button`
  font-size: 24px;
  color: #fff;
  background: #3af;
  border: 1px solid #3af;
  border-left: none;
  cursor: pointer;
  outline: none;
  height: 51px;
  margin-top: 24px;
  padding: 0 12px;
`;

const Subscribe = props => {
  return (
    <Wrapper>
      <Title>Subscribe</Title>
      <Text>Get the latest posts delivered straight to your inbox!</Text>
      <FormGroup>
        <Input type="text" placeholder="Email Address" />
        <Button>&#x2708;</Button>
      </FormGroup>
    </Wrapper>
  );
};

export default Subscribe;
