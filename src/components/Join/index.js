import React from 'react';
import queryString from 'query-string';
import StackExchangeIcon from '../icons/StackExchange';
import GithubIcon from '../icons/GithubOctocat';
import { STACKCRUNCH_API_URL } from '../../config';
import {
  Container,
  Wrapper,
  Title,
  Input,
  ButtonGroup,
  Button,
  Text,
  JoinLink,
  seCSS,
  ghCSS,
  unameExistsInputCSS,
  unameAvailableInputCSS
} from './styled';

const INPUT_STATE = {
  success: 'success',
  error: 'error',
  default: 'default'
};
const INFO_MSG = {
  unameExists: 'Username already exists.',
  unameAvailable: 'Cool! This username is available!',
  userRegistered: 'User registered successfully!'
};

export default class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      inputMsg: '',
      inputState: INPUT_STATE.default // success, error
    };
  }

  onUsernameChange = e => {
    const uname = e.target.value;
    if (uname.length < 3) {
      this.setState({ uname, inputMsg: '', inputState: INPUT_STATE.default });
    } else {
      // TODO: debounce the api calls
      // https://stackoverflow.com/a/28046731/2753940
      // https://www.npmjs.com/package/lodash.debounce
      this.setState(
        {
          uname
        },
        () => {
          // api call to check whether username exists
          const url = `${STACKCRUNCH_API_URL}/users/${uname}/exists`;
          fetch(url)
            .then(response => response.json())
            .then(({ exists: unameExists }) => {
              let inputMsg, inputState;
              if (unameExists) {
                inputMsg = INFO_MSG.unameExists;
                inputState = INPUT_STATE.error;
              } else {
                inputState = INPUT_STATE.success;
                inputMsg = INFO_MSG.unameAvailable;
              }
              this.setState({ inputMsg, inputState });
            })
            .catch(err => {
              console.error(err);
            });
        }
      );
    }
  };

  onAuthButtonClick = (e, strategy) => {
    e.preventDefault();
    const { tab } = queryString.parse(this.props.location.search);
    let params = queryString.stringify({
      returnPath: '/posts',
      newToken: true,
      proc: 'signin'
    });
    if (tab === 'signup') {
      const { uname, inputState } = this.state;
      if (inputState === INPUT_STATE.error) {
        this.unameInput.focus();
        return;
      }
      if (uname.length === 0) {
        this.unameInput.focus();
        return this.setState({ inputMsg: 'Username is required' });
      }
      params = queryString.stringify({
        username: uname,
        returnPath: '/posts',
        newToken: true,
        proc: 'signup'
      });
    }
    const url = `${STACKCRUNCH_API_URL}/auth/${strategy}?${params}`;
    window.location.href = url;
  };

  render() {
    const { tab } = queryString.parse(this.props.location.search);

    let unameInputCSS;
    if (this.state.inputState === INPUT_STATE.success) {
      unameInputCSS = unameAvailableInputCSS;
    } else if (this.state.inputState === INPUT_STATE.error) {
      unameInputCSS = unameExistsInputCSS;
    }

    const joinButtons = (
      <ButtonGroup>
        <Button
          css={seCSS}
          onClick={e => this.onAuthButtonClick(e, 'stackexchange')}
        >
          <StackExchangeIcon height="32" />
        </Button>
        <Button css={ghCSS} onClick={e => this.onAuthButtonClick(e, 'github')}>
          <GithubIcon height="32" style={{ marginTop: 4 }} />
        </Button>
        {/* <Button css={twCSS} onClick={e => this.onAuthButtonClick(e, 'twitter')}>
          <TwitterIcon height="24" />
        </Button> */}
      </ButtonGroup>
    );
    if (tab === 'signup') {
      return (
        <Container>
          <Wrapper>
            <Title>Sign Up</Title>
            <Input
              type="text"
              placeholder="Username"
              minLength={3}
              debounceTimeout={300}
              onChange={this.onUsernameChange}
              css={unameInputCSS}
              inputRef={input => {
                this.unameInput = input;
              }}
            />
            <Text>{this.state.inputMsg}</Text>
            {joinButtons}
            <Text>Already have an account?</Text>
            <JoinLink to={'/join?tab=signin'}>Sign In</JoinLink>
          </Wrapper>
        </Container>
      );
    }
    return (
      <Container>
        <Wrapper>
          <Title>Sign In</Title>
          {joinButtons}
          <Text>Don't have an account yet?</Text>
          <JoinLink to={'/join?tab=signup'}>Sign Up</JoinLink>
        </Wrapper>
      </Container>
    );
  }
}
