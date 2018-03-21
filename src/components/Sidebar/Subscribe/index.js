import React from 'react';
import {
  Wrapper,
  HeaderImg,
  Title,
  Text,
  FormGroup,
  Input,
  Button,
  SuccessMsg,
  EditEmail
} from './styled';
import subscribeApi from '../../../api/subscribe';
import letter from './letter.png';

class Subscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      subscribed: false
    };
  }
  componentWillMount() {
    const emailAddress = localStorage.getItem('subscriptionEmail');
    if (emailAddress) {
      this.setState({
        emailAddress,
        subscribed: true
      });
    }
  }
  updateEmailAddress = e => {
    e.preventDefault();
    this.setState({
      emailAddress: e.target.value
    });
  };
  subscribe = e => {
    e.preventDefault();

    subscribeApi
      .submit(this.state.emailAddress)
      .then(({ errors }) => {
        if (errors) {
          this.input.focus();
          throw errors;
        }
        localStorage.setItem('subscriptionEmail', this.state.emailAddress);
        this.setState({ subscribed: true });
      })
      .catch(console.error);
  };
  editEmail = e => {
    e.preventDefault();
    this.setState({ subscribed: false });
  };
  render() {
    const { subscribed, emailAddress } = this.state;
    const form = (
      <FormGroup>
        <Input
          type="text"
          placeholder="Email Address"
          value={this.state.emailAddress}
          onChange={this.updateEmailAddress}
        />
        <Button onClick={this.subscribe}>&#x2708;</Button>
      </FormGroup>
    );
    const successMessage = (
      <SuccessMsg>
        <div>
          <Text>You're all Set! </Text>
          <span role="img" aria-label="thumbsUp">
            &#x1F44D;
          </span>
        </div>
        <EditEmail onClick={this.editEmail}>{emailAddress}</EditEmail>
      </SuccessMsg>
    );
    return (
      <Wrapper>
        <HeaderImg src={letter} />
        <Title>{subscribed ? 'Subscribed!' : 'Subscribe'}</Title>
        <Text>Get the latest posts delivered straight to your inbox!</Text>
        {!subscribed && form}
        {subscribed && successMessage}
      </Wrapper>
    );
  }
}

export default Subscribe;
