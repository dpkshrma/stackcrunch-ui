import React from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';
import stackoverflow from '../../../icons/so-icon.svg';
import Switcher from '../../Switcher';

const communityImages = {
  stackoverflow
};

const QContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin: 8px 24px;
  min-height: 50px;
  position: relative;
  left: 8px;
`;
const QImage = styled.img`
  max-height: 40px;
  max-width: 40px;
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

const Question = ({ q: { text, href, description }, community }) => {
  return (
    <QContainer>
      <QImage src={communityImages[community]} />
      <QText>{text}</QText>
      <QDesc>{description}</QDesc>
    </QContainer>
  );
};

class Description extends React.Component {
  render() {
    const { percent } = this.props;
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
        color: #00b9ff;
        text-decoration: none;
      }
    `;
    const CommunityDescription = styled.div`
      margin-top: 60px;
      padding: 20px;
      color: #bbb;
      font-family: roboto;
      letter-spacing: 1px;
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
            marginTop: spring(60, { stiffness: 110, damping: 40 }),
            opacity: spring(1, { stiffness: 110, damping: 40 })
          }}
        >
          {style => (
            <CommunityDescription style={style}>
              Read up on articles based on crunching from more than a million
              questions answered on StackOverflow.
            </CommunityDescription>
          )}
        </Motion>
        <Questions timeout={7000}>
          <Question
            q={{
              text: 'How to use threejs in a React App?',
              description:
                'Using threejs can seem pretty difficult for beginners with React, and they often resort to big libraries for simple use-cases. This discussion covers how to easily create a React Component to render a simple 3d cube.',
              href:
                'https://stackoverflow.com/questions/41248287/how-to-connect-threejs-to-react'
            }}
            community="stackoverflow"
          />
          <Question
            q={{
              text: 'What are closures and how to use them?',
              description:
                'Closure is a widely used javascript design pattern. It allows for scoping variable within a region of interest so that they are available to the user when required.',
              href:
                'https://stackoverflow.com/questions/111102/how-do-javascript-closures-work'
            }}
            community="stackoverflow"
          />
          <Question
            q={{
              text: 'Guaging importance of optimistic updates in Apollo',
              description:
                'Optimistic UI is a pattern that you can use to simulate the results of a mutation and update the UI even before receiving a response from the server. Once the response is received from the server, optimistic result is thrown away and replaced with the actual result',
              href:
                'https://stackoverflow.com/questions/48901765/worth-using-apollos-optimisticresponse-with-redux'
            }}
            community="stackoverflow"
          />
        </Questions>
        <Footer>
          Source:{' '}
          <a
            href="https://www.stackoverflow.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.stackoverflow.com
          </a>
        </Footer>
      </Container>
    );
  }
}

export default Description;
