import React from 'react';
import styled from 'styled-components';
import EmailInput from './EmailInput';
import Switcher from './Switcher';
import ShareIcons from './ShareIcons';
import Loading from '../Loading';

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
  @media (max-width: 800px) {
    flex: 1;
  }
  @media (max-width: 642px) {
    & #email-input {
      min-width: 240px !important;
    }
  }
`;
const SectionRight = styled.div`
  padding: 12px 80px;
  height: calc(100vh-70px);
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  position: relative;
  @media (max-width: 1100px) {
    display: none;
  }
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
  state = {
    Playground: null
  };
  componentDidMount() {
    const emailInputElement = document.querySelector('#email-input');
    emailInputElement.focus();
    const importStart = Date.now();
    import('./Playground')
      .then(({ default: Playground }) => {
        const importEnd = Date.now();
        const importTime = importEnd - importStart;
        const minLoadTime = 3000;
        // delay showing playground in case of a fast load
        if (importTime < minLoadTime) {
          setTimeout(() => {
            this.setState({ Playground });
          }, minLoadTime - importTime);
        } else {
          this.setState({ Playground });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    const { Playground } = this.state;
    return (
      <Content>
        <SectionLeft className="section">
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
        <SectionRight className="section">
          {Playground ? (
            <Playground />
          ) : (
            <Loading text="Loading Communities..." />
          )}
        </SectionRight>
      </Content>
    );
  }
}

export default Info;
