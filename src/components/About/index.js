import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import KnowMore from './KnowMore';
import EmailInput from './EmailInput';
import TextSwitcher from './TextSwitcher';
import VitaminPlayground from './VitaminPlayground';

const Container = styled.div`
  background-color: #202126;
  height: 100vh;
  font-family: roboto;
`;
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
  margin-top: 120px;
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

class About extends React.Component {
  componentDidMount() {
    const emailInputElement = document.querySelector('#email-input');
    emailInputElement.focus();
  }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <SectionLeft>
            <Title>
              <TextSwitcher
                data={[
                  'Developers!',
                  'Hackers!',
                  'Engineers!',
                  'Weekend Ninjas!'
                ]}
              />
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
            <VitaminPlayground />
          </SectionRight>
        </Content>
      </Container>
    );
  }
}

export default About;