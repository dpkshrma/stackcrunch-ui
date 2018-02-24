import React from 'react';
import styled from 'styled-components';
import EmailInput from './EmailInput';
import Switcher from './Switcher';
import Playground from './Playground';
import ShareIcons from './ShareIcons';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: calc(100vh - 86px);
`;
const SectionLeft = styled.div`
  padding: 12px 80px;
  height: calc(100vh-70px);
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
`;
const SectionRight = styled.div`
  padding: 12px 80px;
  height: calc(100vh-70px);
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;
const Title = styled.div`
  font-size: 48px;
  color: #fff;
  font-weight: 300;
  margin-top: 168px;
  letter-spacing: 1px;
  & .line2 {
    text-shadow: 0 0 12px orange;
  }
`;
const Subtitle = styled.div`
  color: #ccc;
  font-size: 18px;
  font-weight: 300;
  margin-top: 24px;
  letter-spacing: 1px;
  line-height: 2em;
`;
const UserType = styled.div`
  margin-bottom: 8px;
  border-bottom: 3px dashed #888;
`;

class Info extends React.Component {
  componentDidMount() {
    const emailInputElement = document.querySelector('#email-input');
    emailInputElement.focus();
  }
  render() {
    return (
      <Content>
        <SectionLeft>
          <Title>
            <Switcher top={188}>
              <UserType>Developers!</UserType>
              <UserType>Hackers!</UserType>
              <UserType>Weekend Ninjas!</UserType>
            </Switcher>
            <div className="line2">
              Supercharge your skills!
              <span role="img" aria-label="Supercharge your skills">
                ⚡
              </span>
            </div>
          </Title>
          <Subtitle>
            Learn from solutions to bugs, performance issues, vulnerabilities<br />
            that developers around the world face everyday.
          </Subtitle>
          <EmailInput placeholder="Your Email Address" />
          <ShareIcons />
        </SectionLeft>
        <SectionRight>
          <Playground />
        </SectionRight>
      </Content>
    );
  }
}

export default Info;
