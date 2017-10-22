import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { DebounceInput } from 'react-debounce-input';
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
const Input = styled(DebounceInput)`
  font-size: 14px;
  outline: none;
  border: 1px solid #ccc;
  padding: 16px;
  width: calc(100% - 32px);
  border-radius: 4px;
  margin-bottom: 4px;
  &:active,
  &:focus {
    border-color: #3af;
  }
  ${({ css }) => css};
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
const unameExistsInputCSS = css`
  &,
  &:active,
  &:focus {
    border-color: #f44336;
  }
`;
const unameAvailableInputCSS = css`
  &,
  &:active,
  &:focus {
    border-color: #50a024;
  }
`;

export default class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      unameChecked: false,
      unameExists: false
    };
  }
  onUsernameChange = e => {
    const uname = e.target.value;
    if (uname.length < 3) {
      this.setState({
        uname,
        unameChecked: false,
        unameExists: false
      });
    } else {
      this.setState(
        {
          uname
        },
        () => {
          // api call to check whether username exists
          setTimeout(() => {
            this.setState({
              unameChecked: true,
              unameExists: false
            });
          }, 1000);
        }
      );
    }
  };
  render() {
    const { tab } = queryString.parse(this.props.location.search);

    let unameInputCSS;
    if (this.state.unameChecked) {
      if (this.state.unameExists) {
        unameInputCSS = unameExistsInputCSS;
      } else {
        unameInputCSS = unameAvailableInputCSS;
      }
    }

    let inputMsg;
    if (this.state.unameChecked) {
      if (this.state.unameExists) {
        inputMsg = <Text>Username already exists.</Text>;
      } else {
        inputMsg = <Text>Cool! This username is available!</Text>;
      }
    }
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
    if (tab === 'signup') {
      return (
        <Wrapper>
          <Title>Sign Up</Title>
          <Input
            type="text"
            placeholder="Username"
            minLength={3}
            debounceTimeout={300}
            onChange={this.onUsernameChange}
            css={unameInputCSS}
          />
          {inputMsg}
          {joinButtons}
          <Text>Already have an account?</Text>
          <JoinLink to={'/join?tab=signin'}>SignIn</JoinLink>
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        <Title>Sign In</Title>
        {joinButtons}
        <Text>Don't have an account yet?</Text>
        <JoinLink to={'/join?tab=signup'}>SignUp</JoinLink>
      </Wrapper>
    );
  }
}
