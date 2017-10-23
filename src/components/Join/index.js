import React from 'react';
import queryString from 'query-string';
import StackExchangeIcon from './icons/stackexchange';
import GithubIcon from './icons/github';
import { STACKCRUNCH_API_URL } from '../../config';
import {
  Wrapper,
  Title,
  Input,
  ButtonGroup,
  Button,
  Text,
  JoinLink,
  seCSS,
  ghCSS,
  twCSS,
  unameExistsInputCSS,
  unameAvailableInputCSS
} from './styled';

export default class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      unameChecked: false,
      unameExists: false,
      socialAuthCompleted: this.didSocialAuthComplete(),
      userRegistered: false
    };
  }
  componentDidMount() {
    if (this.state.socialAuthCompleted) {
      const url = `${STACKCRUNCH_API_URL}/auth/reverse${this.props.location
        .search}`;
      fetch(url)
        .then(response => response.json())
        .then(({ success }) => {
          this.setState({ userRegistered: success });
          if (success) {
            console.log('User registered successfully!!');
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
  didSocialAuthComplete = () => {
    // twitter callback data
    const {
      oauth_token: oauthToken,
      oauth_verifier: oauthVerifier
    } = queryString.parse(this.props.location.search);

    return oauthToken && oauthVerifier;
  };
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
          const url = `${STACKCRUNCH_API_URL}/users/${uname}/exists`;
          fetch(url)
            .then(response => response.json())
            .then(({ exists: unameExists }) => {
              this.setState({
                unameChecked: true,
                unameExists
              });
            })
            .catch(err => {
              console.error(err);
            });
        }
      );
    }
  };
  onTwitterClick = e => {
    e.preventDefault();
    const url = `${STACKCRUNCH_API_URL}/auth?strategy=twitter`;
    window.location.href = url;
  };
  onGithubClick = e => {
    e.preventDefault();
    const url = `${STACKCRUNCH_API_URL}/auth/github`;
    window.location.href = url;
  };
  onStackexchangeClick = e => {
    e.preventDefault();
    const url = `${STACKCRUNCH_API_URL}/auth/stackexchange`;
    window.location.href = url;
  };
  render() {
    if (this.state.socialAuthCompleted) {
    }

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
        <Button css={seCSS} onClick={this.onStackexchangeClick}>
          <StackExchangeIcon height="32" />
        </Button>
        <Button css={ghCSS} onClick={this.onGithubClick}>
          <GithubIcon height="32" />
        </Button>
        {/* <Button css={twCSS} onClick={this.onTwitterClick}>
          <TwitterIcon height="24" />
        </Button> */}
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
