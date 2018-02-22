import React from 'react';
import styled from 'styled-components';
import KnowMore from './KnowMore';
import EmailInput from './EmailInput';
import Switcher from './Switcher';
import Playground from './Playground';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
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
  margin-top: 200px;
  letter-spacing: 1px;
`;
const Subtitle = styled.div`
  color: #ccc;
  font-size: 18px;
  font-weight: 300;
  margin-top: 24px;
  letter-spacing: 1px;
  line-height: 2em;
`;
const LaunchText = Subtitle.extend`
  font-size: 22px;
  color: #eee;
  margin-top: 60px;
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
            <Switcher top={220}>
              <UserType>Developers!</UserType>
              <UserType>Hackers!</UserType>
              <UserType>Weekend Ninjas!</UserType>
            </Switcher>
            <div>Supercharge your skills!</div>
          </Title>
          <Subtitle>
            Learn from solutions to bugs, performance issues, vulnerabilities<br />
            that developers around the world face everyday.
            {/* StackCrunch is a place where you can find solution-centric articles<br />
            to cater all your development needs. */}
          </Subtitle>
          <LaunchText>
            Launching soon!{' '}
            <span role="img" aria-label="launch">
              🚀
            </span>{' '}
            Be the first one to know!
          </LaunchText>
          <EmailInput placeholder="Your Email Address" />
          <KnowMore />
        </SectionLeft>
        <SectionRight>
          <Playground />
        </SectionRight>
      </Content>
    );
  }
}

export default Info;
