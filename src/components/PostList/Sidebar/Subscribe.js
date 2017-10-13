import React from 'react';
import styled from 'styled-components';
import { subscribeUser } from '../../../services/Subscription';

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
    subscribeUser(this.state.emailAddress)
      .then(response => {
        localStorage.setItem('subscriptionEmail', this.state.emailAddress);
        this.setState({ subscribed: true });
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    const { subscribed } = this.state;
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
    const successMessage = <Text>You're all Set!</Text>;
    return (
      <Wrapper>
        <Title>Subscribe</Title>
        <Text>Get the latest posts delivered straight to your inbox!</Text>
        {!subscribed && form}
        {subscribed && successMessage}
      </Wrapper>
    );
  }
}

export default Subscribe;
