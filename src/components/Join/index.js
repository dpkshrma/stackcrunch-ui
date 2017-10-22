import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import queryString from 'query-string';
import StackExchangeIcon from './icons/stackexchange';
import GithubIcon from './icons/github';
import TwitterIcon from './icons/twitter';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: 320px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 32px;
  max-height: 300px;
`;
const Title = styled.span`
  font-size: 20px;
  margin: 12px 0 28px;
  color: #666;
  letter-spacing: 2px;
  text-transform: uppercase;
`;
const Input = styled.input`
  font-size: 14px;
  outline: none;
  border: 1px solid #ccc;
  padding: 16px;
  width: calc(100% - 32px);
  border-radius: 4px;
  &:active,
  &:focus {
    border-color: #3af;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 48px;
`;
const Button = styled.button`
  font-size: 24px;
  color: #444;
  background: none;
  border: 1px solid #ccc;
  margin: 0 8px;
  cursor: pointer;
  outline: none;
  height: 51px;
  width: 100%;
  margin-top: 24px;
  border-radius: 4px;
  &:hover {
    background: rgba(0, 0, 0, 0.01);
  }
  ${({ css }) => css};
`;
const Text = styled.div`
  font-size: 12px;
  color: #999;
`;
const JoinLink = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  color: #07c;
`;
const seCSS = css`
  margin-left: 0;
  margin-right: 8px;
`;
const ghCSS = css`
  margin-left: 4px;
  margin-right: 4px;
`;
const twCSS = css`
  margin-right: 0;
  margin-left: 8px;
`;

export default props => {
  const { tab } = queryString.parse(props.location.search);
  const joinButtons = (
    <ButtonGroup>
      <Button css={seCSS}>
        <StackExchangeIcon height="32" />
      </Button>
      <Button css={ghCSS}>
        <GithubIcon height="32" />
      </Button>
      <Button css={twCSS}>
        <TwitterIcon height="24" />
      </Button>
    </ButtonGroup>
  );
  return (
    <Wrapper>
      <Title>{tab === 'signup' ? 'Sign Up' : 'Sign In'}</Title>
      {tab === 'signup' && <Input type="text" placeholder="Username" />}
      {joinButtons}
      <Text>
        {tab === 'signup'
          ? 'Already have an account?'
          : "Don't have an account yet?"}
      </Text>
      {tab === 'signup' ? (
        <JoinLink to={'/join?tab=signin'}>SignIn</JoinLink>
      ) : (
        <JoinLink to={'/join?tab=signup'}>SignUp</JoinLink>
      )}
    </Wrapper>
  );
};
