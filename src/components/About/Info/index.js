import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import EmailInput from './EmailInput';
import Switcher from './Switcher';
import ShareIcons from './ShareIcons';
import Loading from '../Loading';

const LAUNCH_POST_LINK =
  '/post/StackCrunch-Crowdsourcing-Practical-Solutionslessspangreater-rJeRqu5y5f';
const ReadMoreLink = styled(Link)`
  text-decoration: none;
  border-bottom: 1px dashed #ffa000;
  color: #ccc;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  @media (max-width: 1439px) {
    max-width: 100vw;
  }
  @media (min-width: 1440px) {
    max-width: 1440px;
  }
  @media (max-width: 1023px) {
    display: block;
  }
`;
const SectionLeft = styled.div`
  padding: 12px 80px;
  flex: 0 0 auto;
  @media (max-width: 1279px) {
    flex: 1;
  }
  @media (max-width: 479px) {
    padding: 12px 20px;
  }
`;
const SectionRight = styled.div`
  padding: 12px 80px;
  flex: 1 1 auto;
  @media (max-width: 479px) {
    display: none;
  }
`;
const Title = styled.div`
  font-size: 48px;
  color: #fff;
  font-weight: 300;
  margin-top: 160px;
  letter-spacing: 1px;
  & .line2 {
    text-shadow: 0 0 12px orange;
  }
  @media (max-width: 479px) {
    margin-top: 100px;
    font-size: 40px;
    & .line1 {
      font-size: 36px;
    }
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
    emailInputElement && emailInputElement.focus();
    if (document.body.offsetWidth > 479) {
      this.loadPlayground();
    }
  }
  loadPlayground = () => {
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
  };
  render() {
    const { Playground } = this.state;
    let switcherMarginTop = 188;
    if (document.body.offsetWidth < 480) {
      switcherMarginTop = 120;
    }
    return (
      <Content className="content">
        <SectionLeft className="section">
          <Title>
            <Switcher top={switcherMarginTop} className="line1">
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
            that developers around the world face everyday.<br />
            <ReadMoreLink to={LAUNCH_POST_LINK}>Read more</ReadMoreLink>
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
