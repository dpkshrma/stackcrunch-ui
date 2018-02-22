import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin-top: 20px;
`;
const Input = styled.input`
  font-size: 16px;
  color: #eee;
  outline: none;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  min-width: 320px;
  max-width: 400px;
  font-family: roboto;
  font-weight: 300;
  background: rgba(0, 0, 0, 0);
  padding: 8px;
  letter-spacing: 2px;
  &::placeholder {
    font-weight: 100;
    color: #999;
    letter-spacing: 2px;
  }
  &:focus {
    border-bottom: 1px solid #ffa000;
  }
`;
const Submit = styled.div`
  border-bottom: 1px solid #eee;
  color: #eee;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-family: roboto;
  font-weight: 300;
  letter-spacing: 2px;
  background-color: #0077ccee;
  &:hover {
    background-color: #07c;
  }
`;

const EmailInput = () => {
  return (
    <Container>
      <Input id="email-input" placeholder="Your Email Address" />
      <Submit>Subscribe</Submit>
    </Container>
  );
};

export default EmailInput;
