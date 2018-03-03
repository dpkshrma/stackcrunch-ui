import React from 'react';
import styled from 'styled-components';
import subscribeApi from '../../../api/subscribe';

const Container = styled.div`
  margin-top: 84px;
  @media (max-width: 479px) {
    margin-top: 56px;
  }
`;
const Input = styled.input`
  font-size: 16px;
  color: #eee;
  outline: none;
  border: none;
  border-bottom: 1px solid #e0e0e0;
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
  @media (min-width: 1025px) {
    width: 200px;
  }
  @media (min-width: 1280px) {
    width: 320px;
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
const Form = styled.form`
  display: flex;
  margin-top: 20px;
`;
const LaunchText = styled.div`
  color: #ccc;
  font-size: 18px;
  font-weight: 300;
  margin-top: 24px;
  letter-spacing: 1px;
  line-height: 2em;
  font-size: 22px;
  color: #eee;
`;

const Message = styled.div`
  color: #fff;
  font-size: 20px;
  font-family: roboto;
  font-weight: 300;
  letter-spacing: 1px;
  margin-top: 8px;
  line-height: 1.2;
`;
const Heart = () => {
  const Container = styled.span`
    color: #d00404;
  `;
  return <Container role="img">&hearts;</Container>;
};
const Smile = () => {
  const Container = styled.span`
    color: #ffd400;
    font-size: 28px;
  `;
  return <Container role="img">&#9787;</Container>;
};

class EmailInput extends React.Component {
  state = {
    value: '',
    submitSuccess: false
  };
  update = e => {
    e.preventDefault();
    this.setState({ value: e.target.value });
  };
  submit = e => {
    e.preventDefault();
    subscribeApi
      .submit(this.state.value)
      .then(({ errors }) => {
        if (errors) {
          this.input.focus();
          throw errors;
        }
        this.setState({ submitSuccess: true });
      })
      .catch(console.error);
  };
  renderSuccessMsg = () => (
    <Message>
      Thanks for subscribing! <Heart />
      <br />
      We'll notify you as soon as we go live! <Smile />
    </Message>
  );
  renderForm = () => [
    <LaunchText key="launch">
      Launching soon!{' '}
      <span role="img" aria-label="launch">
        🚀
      </span>{' '}
      Be the first one to know!
    </LaunchText>,
    <Form key="form">
      <Input
        innerRef={el => {
          this.input = el;
        }}
        value={this.state.value}
        onChange={this.update}
        id="email-input"
        placeholder="Your Email Address"
      />
      <Submit onClick={this.submit}>Subscribe</Submit>
    </Form>
  ];
  render() {
    return (
      <Container>
        {this.state.submitSuccess ? this.renderSuccessMsg() : this.renderForm()}
      </Container>
    );
  }
}

EmailInput.defaultProps = {
  value: '',
  onUpdate: () => {},
  onSubmit: () => {}
};

export default EmailInput;
