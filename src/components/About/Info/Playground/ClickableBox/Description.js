import React from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';
import Switcher from '../../Switcher';

const QContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin: 8px 24px;
  min-height: 50px;
  position: relative;
  left: 8px;
`;
const QImage = styled.img`
  max-height: 60px;
  max-width: 60px;
  position: absolute;
  left: -24px;
  top: -24px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  border: 6px solid #2b2c32;
  padding: 8px;
  background: #55565e;
`;
const QLink = styled.a`
  text-decoration: none;
`;
const QText = styled.div`
  font-family: roboto;
  font-size: 16px;
  font-weight: 300;
  color: #fff;
  padding: 12px 48px;
  padding-right: 20px;
  letter-spacing: 1px;
`;
const QDesc = styled.div`
  font-family: roboto;
  font-size: 14px;
  font-weight: 300;
  color: #ccc;
  padding: 4px 48px 12px;
  padding-right: 20px;
  letter-spacing: 1px;
`;

const Question = ({ q: { text, link, description }, communityIcon }) => {
  return (
    <QContainer>
      <QImage src={communityIcon} />
      <QLink href={link} target="_blank">
        <QText>{text}</QText>
        <QDesc>{description}</QDesc>
      </QLink>
    </QContainer>
  );
};

class Description extends React.Component {
  render() {
    const { percent, questions, community = {} } = this.props;
    const Container = styled.div`
      height: ${percent * 400}px;
      width: 480px;
      position: absolute;
      left: -199px;
      top: 41px;
      z-index: 110;
      background: rgba(255, 255, 255, 0.05);
      overflow: hidden;
      & ${QContainer} {
        margin-top: 52px;
      }
    `;
    const Questions = styled(Switcher)`
      height: 100%;
      overflow-y: scroll;
    `;
    const Footer = styled.div`
      font-size: 14px;
      color: #bbb;
      background: rgba(255, 255, 255, 0.1);
      padding: 8px;
      position: absolute;
      bottom: 0;
      width: calc(100% - 16px);
      min-height: 20px;
      text-align: right;
      & a {
        color: #fff;
        text-decoration: none;
        text-shadow: 0 0 16px ${community.color};
      }
    `;
    const CommunityDescription = styled.div`
      margin-top: 60px;
      padding: 20px;
      color: #bbb;
      font-family: roboto;
      font-size: 14px;
      letter-spacing: 1px;
      line-height: 1.4;
      font-weight: 300;
    `;
    return (
      <Container>
        <Motion
          defaultStyle={{
            marginTop: 120,
            opacity: 0
          }}
          style={{
            marginTop: spring(48, { damping: 35 }),
            opacity: spring(1, { damping: 35 })
          }}
        >
          {style => (
            <CommunityDescription style={style}>
              {community.description || (
                <span>
                  Learn from interesting bite-sized stories based on millions of
                  questions answered on open Q&A communities.
                </span>
              )}
            </CommunityDescription>
          )}
        </Motion>
        <Questions timeout={7000}>
          {questions
            ? questions.map((q, i) => (
                <Question key={`${i}`} q={q} communityIcon={community.icon} />
              ))
            : null}
        </Questions>
        <Footer>
          {community.name && (
            <div>
              Source:{' '}
              <a
                href={community.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {community.name}
              </a>
            </div>
          )}
        </Footer>
      </Container>
    );
  }
}

export default Description;
